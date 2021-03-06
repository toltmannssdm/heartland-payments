/**
 * helper.v2.js
 * @NApiVersion 2.x
 */
define([
    'N/log',
    'N/search',
    'N/record',
    'N/runtime',
    'SuiteBundles/Bundle 227444/HeartlandPayments/20180312-globalpayments.api',
    'SuiteBundles/Bundle 227444/HeartlandPayments/Heartland_Application_CM',

], function (log, search, record, runtime, GP, app) {

    function isProduction() {
        return runtime.envType == 'PRODUCTION';
    }

    function addToken(ccData) {

        log.debug({title: 'ccData', details: ccData});

        if (!ccData || !ccData.token) {
            log.error({title: 'no ccData or token', details: [ccData]});
            throw "no ccData or token";
        }
        
        var oneTimeUse = String(ccData.oneTimeUse || false).substr(0,1).toUpperCase();

        var ccNumber = ccData.number.replace(/.(?=.{4,}$)/g, '*');

        var filters = [
            ['isinactive', search.Operator.IS, false],
            'AND',
            ['custrecord_heartl_customer', search.Operator.ANYOF, ccData.custId],
            'AND',
            ['name', search.Operator.IS, ccNumber],
            'AND',
            ['custrecord_heartl_one_time_use', search.Operator.IS, false]
        ];

        var columns = ['internalid'];

        var searchOptions = {
            type: 'customrecord_heartl_cc_tokens',
            filters: filters,
            columns: columns
        };

        var s = search.create(searchOptions);

        var searchResult = s.run().getRange({
            start: 0,
            end: 1
        });

        log.debug({title: 'searchOptions ,searchResult', details: [searchResult.length, searchOptions, searchResult]});

        if (searchResult.length == 1) {

            var recordId = searchResult[0].id;

            var options = {
                type: 'customrecord_heartl_cc_tokens',
                id: recordId,
                values: {
                    custrecord_heartl_customer: ccData.custId,
                    custrecord_heartl_ccname: ccData.cardHolderName,
                    custrecord_heartl_cc_token: ccData.token,

                    custrecord_heartl_street_address_1: ccData.address.streetAddress1,
                    custrecord_heartl_street_address_2: ccData.address.streetAddress2,
                    custrecord_heartl_street_address_3: ccData.address.streetAddress3,

                    custrecord_heartl_city: ccData.address.city,
                    custrecord_heartl_state: ccData.address.state,
                    custrecord_heartl_postal_code: ccData.address.postalCode,
                    custrecord_heartl_country: ccData.address.country,
                    custrecord_heartl_card_type: ccData.cardType,

                    custrecord_heartl_one_time_use: oneTimeUse
                }
            };

            record.submitFields(options);

            return searchResult[0].id;

        } else {

            var recFields = {
                name: ccNumber,
                
                custrecord_heartl_customer: ccData.custId,
                custrecord_heartl_ccname: ccData.cardHolderName,
                custrecord_heartl_cc_token: ccData.token,

                custrecord_heartl_street_address_1: ccData.address.streetAddress1,
                custrecord_heartl_street_address_2: ccData.address.streetAddress2,
                custrecord_heartl_street_address_3: ccData.address.streetAddress3,

                custrecord_heartl_city: ccData.address.city,
                custrecord_heartl_state: ccData.address.state,
                custrecord_heartl_postal_code: ccData.address.postalCode,
                custrecord_heartl_country: ccData.address.country,
                custrecord_heartl_card_type: ccData.cardType,

                custrecord_heartl_one_time_use: oneTimeUse == 'T'
            };
          
            var rec = record.create({
                type: 'customrecord_heartl_cc_tokens',
                isDynamic: true
            });

            for (var key in recFields) {
                if (recFields.hasOwnProperty(key)) {
                  	var options = {
                        fieldId: key,
                        value: recFields[key]
                    };

                    rec.setValue(options);
                }
            }

            var id = rec.save();

            return id;
        }
    }

    /* Updates the newRecord object with API response data */
    function updateNewRecord(newRecord, resp, appConfig) {

        try {
            var avsResponseCode = resp.avsResponseCode;
            var avsResponseMessage = resp.avsResponseMessage;
            var avsResponse = avsResponseCode + ': ' + avsResponseMessage;
            var paymentOperation = newRecord.getValue({
                fieldId: appConfig.transaction.body.paymentOperation
            });

            var paymentOperationText = appConfig.paymentOperations[paymentOperation];

            var customer = newRecord.getValue({
                fieldId: 'entity'
            }) || newRecord.getValue({
                fieldId: 'customer'
            });

            var tokenId = newRecord.getValue({
                fieldId: appConfig.transaction.body.creditCardId
            });

            var token = newRecord.getValue({
                fieldId: appConfig.transaction.body.ccToken
            });
            var transactionId = newRecord.id;

            var heartlandTransactionRecord = record.create({
                type: appConfig.record.transaction.type,
                isDynamic: true
            });

            var responseTransactionId = resp && resp.transactionReference ? resp.transactionReference.transactionId : 'none';

            heartlandTransactionRecord.setValue({
                fieldId: 'name',
                value: paymentOperationText + ' - #' + responseTransactionId
            });
 
            heartlandTransactionRecord.setValue({
                fieldId: appConfig.record.transaction.field.gatewayResponse,
                value: JSON.stringify(resp)
            });
 
            heartlandTransactionRecord.setValue({
                fieldId: appConfig.record.transaction.field.customer,
                value: customer
            });
 
            heartlandTransactionRecord.setValue({
                fieldId: appConfig.record.transaction.field.transaction,
                value: transactionId
            });

            heartlandTransactionRecord.setValue({
                fieldId: appConfig.record.transaction.field.token,
                value: tokenId
            });

            var trxRec = heartlandTransactionRecord.save();
            log.debug({title: 'trxRec', details: trxRec});

            newRecord.setValue({
                fieldId: appConfig.transaction.body.heartlandTransactionId,
                value: trxRec
            });

            newRecord.setValue({
                fieldId: appConfig.transaction.body.ccAuthCode,
                value: resp.transactionReference.authCode
            });
            newRecord.setValue({
                fieldId: appConfig.transaction.body.transactionId,
                value: responseTransactionId
            });
            newRecord.setValue({
                fieldId: appConfig.transaction.body.referenceNumber,
                value: resp.referenceNumber
            });
            newRecord.setValue({
                fieldId: appConfig.transaction.body.avsResultText,
                value: avsResponse
            });
        } catch(e) {
            throw appConfig.language.badGatewayResponse;
        }
    }

    function getHeartlandAddress (currentTransactionRecord, appConfig) {
        var address = new GP.Address();
        var addressData = getAddress(currentTransactionRecord, appConfig);
        for (var addressElement in addressData) {
            address[addressElement] = addressData[addressElement];
        }
        return address;
    }

    function getAddress(currentTransactionRecord, appConfig) {
        return {
            email: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.email
            }),
            phone: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.phone
            }),
            firstName: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.firstName
            }),
            lastName: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.lastName
            }),
            processAvs: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.processAvs
            }),
            streetAddress1: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.streetAddress1
            }),
            streetAddress2: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.streetAddress2
            }),
            streetAddress3: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.streetAddress3
            }),
            city: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.city
            }),
            state: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.state
            }),
            postalCode: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.postalCode
            }),
            country: currentTransactionRecord.getValue({
                fieldId: appConfig.transaction.body.address.country
            }),
            type: appConfig.defaultAddressType
        };
    }

    function getCustomRecordAddress(currentTransactionRecord, appConfig) {
        return {
            email: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.email
            }),
            phone: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.phone
            }),
            firstName: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.ccname
            }),
            lastName: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.lastname
            }),
            processAvs: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.avs
            }),
            streetAddress1: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.street1
            }),
            streetAddress2: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.street2
            }),
            streetAddress3: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.street3
            }),
            city: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.city
            }),
            state: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.state
            }),
            postalCode: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.postalcode
            }),
            country: currentTransactionRecord.getValue({
                fieldId: appConfig.record.tokens.field.country
            }),
            type: appConfig.defaultAddressType
        };
    }

    function createHeartlandHPSConnection(clientLibrary, success, failure, publicKey) {
        // Create a new `HPS` object with the necessary configuration
        return new clientLibrary.HPS({
          publicKey: publicKey,
          type:      'iframe',
          // Configure the iframe fields to tell the library where
          // the iframe should be inserted into the DOM and some
          // basic options
          fields: {
            cardNumber: {
              target:      'iframesCardNumber',
              placeholder: '•••• •••• •••• ••••'
            },
            cardExpiration: {
              target:      'iframesCardExpiration',
              placeholder: 'MM / YYYY'
            },
            cardCvv: {
              target:      'iframesCardCvv',
              placeholder: 'CVV'
            }
          },
          // Collection of CSS to inject into the iframes.
          // These properties can match the site's styles
          // to create a seamless experience.
          style: {
            '.text': {
                'font-size': '9pt',
                'text-transform': 'uppercase',
                'color': '#666 !important',
            },
            'input[type=text],input[type=tel]': {
                'box-sizing':'border-box',
                'display': 'block',
                'width': '100%',
                'height': '34px',
                'padding': '6px 12px',
                'font-size': '14px',
                'line-height': '1.42857143',
                'color': '#555',
                'background-color': '#fff',
                'background-image': 'none',
                'border': '1px solid #ccc',
                'border-radius': '4px',
            },
            'input[type=text]:focus,input[type=tel]:focus': {
                'border-color': '#66afe9',
                'outline': '0',
            },
            'input[type=submit]': {
                'box-sizing':'border-box',
                'display': 'inline-block',
                'padding': '6px 12px',
                'margin-bottom': '0',
                'font-size': '14px',
                'font-weight': '400',
                'line-height': '1.42857143',
                'text-align': 'center',
                'white-space': 'nowrap',
                'vertical-align': 'middle',
                '-ms-touch-action': 'manipulation',
                'touch-action': 'manipulation',
                'cursor': 'pointer',
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none',
                'background-image': 'none',
                'border': '1px solid transparent',
                'border-radius': '4px',
                'color': '#fff',
                'background-color': '#337ab7',
                'border-color': '#2e6da4'
            },
            'input[type=submit]:hover': {
                    'color': '#fff',
                'background-color': '#286090',
                'border-color': '#204d74'
            },
            'input[type=submit]:focus, input[type=submit].focus': {
                'color': '#fff',
                'background-color': '#286090',
                'border-color': '#122b40',
                'text-decoration': 'none',
            }
          },
          // Callback when a token is received from the service
          onTokenSuccess: success,
          // Callback when an error is received from the service
          onTokenError: failure
        });
    }

    function addHPSSubmitHandler(Heartland, hps, publicKey) {

        // Attach a handler to interrupt the form submission
        Heartland.Events.addHandler(document.getElementById('heartlandsubmit'), 'click', function (e) {
          
            e.preventDefault();
          
            // Tell the iframes to tokenize the data
            hps.Messages.post(
                {
                  accumulateData: true,
                  action: 'tokenize',
                  message: publicKey
                },
                'cardNumber'
            );
        });
    }

    return {
        addToken: addToken,
        isProduction: isProduction,
        updateNewRecord: updateNewRecord,
        getAddress: getAddress,
        getHeartlandAddress: getHeartlandAddress,
        getCustomRecordAddress: getCustomRecordAddress,
        createHeartlandHPSConnection: createHeartlandHPSConnection,
        addHPSSubmitHandler: addHPSSubmitHandler
    };
});