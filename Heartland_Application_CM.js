/**
 * app.js
 * @NApiVersion 2.x

 @todo implement withInvoiceNumber
 */
define([
    'N/error',
    'N/https',
    'N/log',
    'N/search',
    'N/record',
    'N/runtime',
    'N/url',
    'SuiteBundles/Bundle 227444/HeartlandPayments/20180312-globalpayments.api',
    'SuiteBundles/Bundle 227444/HeartlandPayments/Heartland_Utilities_CM'
], function (error, https, log, search, record, runtime, url, GP, utils) {

    var settings = {};

    var config = {

        cardTypes: {
            Visa: 'visa',
            MasterCard: 'mastercard',
            AmericanExpress: 'amex',
            Discover: 'discover',
            JCB: 'jcb',
            Other: 'other'
        },

        paymentOperations: {
            1: 'Authorization',
            2: 'Sale',
            3: 'Refund',
            4: 'Capture',
            5: 'Recurring'
        },

        acceptableResponseCodes: ['00', '0', '85'],
        defaultAddressType: 'Billing',

        language: {
            paymentMethodIsNotHeartland: 'The Heartland payment method is not set. Set it now?',
            clearHeartlandTransactionBodyFields: 'Clear all Heartland transaction data? ',
            resetForRefund: 'The Heartland transaction data will be cleared on save.',
            noGatewayResponse: 'UNEXPECTED ERROR\n\nNo response from Heartland credit card gateway',
            unacceptableResponseHeader: 'ERROR\n\nHeartland credit card gateway error\n',
            generalError: 'ERROR\n\nAn Error occurred while transmitting to the Heartland credit card gateway API. Try again, try another card, check the error logs.',
            authorizeCard: "Authorize Credit Card?\n\nClick [Cancel] to abort or [OK] to continue",
            authorizeExistingCard: "Authorize Existing Credit Card?\n\nClick [Cancel] to abort or [OK] to continue",
            invalidExpiration: "USER ERROR\n\nPlease set the expiration with MM/YY or MM/YYYY format.",
            invalidVerificationCode: "USER ERROR\n\nPlease enter into the Security Code a 3 or 4 digit card verification code (typically found on the back of the card in the signature panel.)",
            invalidCardNumber: "USER ERROR\n\nThe card number entered is invalid.",
            notAHeartlandTransaction: 'This Refund\'s source transaction does not use the Heartland payment method, and will not be unable to Refund a Heartland payment. Double check the record details',
            tokenExists: 'Press [OK] to Authorize the existing tokenized card for the total amount.',
            amountIsZero: 'USER ERROR\n\nThere is no amount to charge (paymentsessionamount must be set)',
            noItemsOnTransaction: 'USER ERROR\n\nThe transaction must have one or more items.'
        },

        params: {
            sandboxProfile: 'custscript_heartl_pmt_profile',
            productionProfile: 'custscript_heartl_sandbox_pmt_profile',
        },

        record: {
            connection_settings: {
                type: 'customrecord_heartl_settings',
                fields: {
                    publicKey: { 
                        fieldId: 'custrecord_heartl_s_public_key',
                        defaultValue: 'pkapi_cert_XXXXXXXXXXXXXXXXXX'
                    },
                    key: { 
                        fieldId: 'custrecord_heartl_secret_key',
                        defaultValue: 'skapi_cert_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                    },
                    serviceUrl: {
                        fieldId: 'custrecord_heartl_url',
                        defaultValue: 'https://cert.api2.heartlandportico.com'
                    },
                    website: {
                        fieldId: 'custrecord_heartl_s_website',
                        defaultValue: ''
                    },
                    subsidiary: {
                        fieldId: 'custrecord_heartl_s_subsidiary',
                        defaultValue: ''
                    },
                    currencies: {
                        fieldId: 'custrecord_heartl_s_currencies',
                        defaultValue: ''
                    },
                    testMode: {
                        fieldId: 'custrecord_heartl_s_testmode',
                        defaultValue: false
                    },
                    developerId: {
                        fieldId: 'custrecord_heartl_s_developer_id',
                        defaultValue: '000000'
                    },
                    versionNumber: {
                        fieldId: 'custrecord_heartl_s_version_number',
                        defaultValue: '0000'
                    },
                    allowDuplicates: {
                        fieldId: 'custrecord_heartl_s_allow_duplicate_tran',
                        defaultValue: false
                    },
                    autoSetHeartlandDefaultPayment: {
                        fieldId: 'custrecord_heartl_s_autoset_payment_meth',
                        defaultValue: false
                    },
                    autoCaptureCashSales: {
                        fieldId: 'custrecord_heartl_s_autocapture_cashsale',
                        defaultValue: true
                    },
                    notifyAdmins: {
                        fieldId: 'custrecord_heartl_s_error_notify_admin',
                        defaultValue: true
                    },
                    heartlandPaymentMethodId: {
                        fieldId: 'custrecord_heartl_s_payment_method',
                        defaultValue: '{heartlandPaymentMethodId}'
                    },
                    autoRefundHeartlandPayments: {
                        fieldId: 'custrecord_heartl_s_autorefund',
                        defaultValue: true
                    },
                    allowPartialAmount: {
                        fieldId: 'custrecord_heartl_allow_partial_amount',
                        defaultValue: false
                    },
                    authorizeWithAvs: {
                        fieldId: 'custrecord_heartl_s_authorize_avs',
                        defaultValue: true
                    },
                    maxRetries: {
                        fieldId: 'custrecord_heartl_s_max_retries',
                        defaultValue: ''
                    },
                    avsNotMatched: {
                        fieldId: 'custrecord_heartl_s_avs_notmatched',
                        defaultValue: ''
                    },
                    avsNotAvailable: {
                        fieldId: 'custrecord_heartl_s_avs_notavailable',
                        defaultValue: ''
                    },
                    avsPartialMatch: {
                        fieldId: 'custrecord_heartl_s_avs_partialmatch',
                        defaultValue: ''
                    },
                    cvvNotMatched: {
                        fieldId: 'custrecord_heartl_s_cvv_notmatched',
                        defaultValue: ''
                    },
                    cvvNotSubmitted: {
                        fieldId: 'custrecord_heartl_s_cvv_notsubmitted',
                        defaultValue: ''
                    },
                    cvvNotSupported: {
                        fieldId: 'custrecord_heartl_s_cvv_notsupported',
                        defaultValue: ''
                    },
                    cvvSvcNotAvailable: {
                        fieldId: 'custrecord_heartl_s_cvv_svc_notavailable',
                        defaultValue: ''
                    },
                    authorization: {
                        fieldId: 'custrecord_heartl_s_authorization', 
                        defaultValue: true
                    },
                    verify: { 
                        fieldId: 'custrecord_heartl_s_verify', 
                        defaultValue: true
                    },
                    charge: { 
                        fieldId: 'custrecord_heartl_s_charge', 
                        defaultValue: true
                    },
                    tokenize: { 
                        fieldId: 'custrecord_heartl_s_tokenize', 
                        defaultValue: true
                    },
                    capture: { 
                        fieldId: 'custrecord_heartl_s_capture', 
                        defaultValue: true
                    },
                    reverse: { 
                        fieldId: 'custrecord_heartl_s_reverse', 
                        defaultValue: true
                    },
                    refund: { 
                        fieldId: 'custrecord_heartl_s_refund', 
                        defaultValue: true
                    },
                    void: { 
                        fieldId: 'custrecord_heartl_s_void', 
                        defaultValue: true
                    },
                    recurring: { 
                        fieldId: 'custrecord_heartl_s_recurring',
                        defaultValue: true
                    }
                }
            },
            tokens: {
                type: 'customrecord_heartl_cc_tokens',
                field: {
                    customer: 'custrecord_heartl_customer',
                    ccname: 'custrecord_heartl_ccname',
                    lastname: 'custrecord_heartl_last_name',
                    token: 'custrecord_heartl_cc_token',
                    street1: 'custrecord_heartl_street_address_1',
                    street2: 'custrecord_heartl_street_address_2',
                    street3: 'custrecord_heartl_street_address_3',
                    city: 'custrecord_heartl_city',
                    province: 'custrecord_heartl_province',
                    state: 'custrecord_heartl_state',
                    postalcode: 'custrecord_heartl_postal_code',
                    country: 'custrecord_heartl_country',
                    cardtype: 'custrecord_heartl_card_type',
                    avs: 'custrecord_heartl_token_avs',
                    onetimeuse: 'custrecord_heartl_one_time_use',
                    iframe: 'custrecord_heartl_iframe',
                    email: 'custrecord_heartl_email',
                    phone: 'custrecord_heartl_phone'
                }
            },
            transaction: {
                type: 'customrecord_heartl_transaction',
                field: {
                    gatewayResponse: 'custrecord_hlt_gateway_response',
                    customer: 'custrecord_hlt_customer',
                    transaction: 'custrecord_hlt_transaction',
                    token: 'custrecord_hlt_token'
                }
            }
        },

        list: {
            payment_operation:{
                id: 'customlist_heartl_pmt_op',
                options: {
                    AUTHORIZE: 1,
                    SALE: 2,
                    REFUND: 3,
                    CAPTURE: 4,
                    RECURRING: 5
                }
            }
        },

        entity: {
            defaultCard: 'custentity_heartl_default_token'
        },

        transaction: {
            body: {

                /* FUNCTIONAL/ACTIONS */
                reset: 'custbody_heartl_reset',
                creditCards: 'custbody_heartl_ccs',
                creditCardId: 'custbody_heartl_cc_id',

                /* API REQUEST DATA: card */
                doNotStoreCard: 'custbody_heartl_do_not_store_card',
                ccHolderName: 'custbody_heartl_ccholder_name',
                cardType: 'custbody_heartl_cardtype',
                csc: 'custbody_heartl_csc',
                expiration: 'custbody_heartl_expiration',
                creditCardNumber: 'custbody_heartl_ccnumber',

                /* API REQUEST DATA: avs */
                address: {
                    processAvs: 'custbody_heartl_process_avs',
                    streetAddress1: 'custbody_heartl_street_address_1',
                    streetAddress2: 'custbody_heartl_street_address_2',
                    streetAddress3: 'custbody_heartl_street_address_3',
                    city: 'custbody_heartl_city',
                    state: 'custbody_heartl_state',
                    postalCode: 'custbody_heartl_postal_code',
                    country: 'custbody_heartl_country',
                    phone: 'custbody_heartl_phone',
                    email: 'custbody_heartl_email',
                    firstName: 'custbody_heartl_ccholder_name',
                    lastName: 'custbody_heartl_last_name',
                },

                /* API RESPONSE DATA: card */
                ccToken: 'custbody_heartl_cc_token',

                /* API RESPONSE DATA: transaction  */
                gatewayResponse: 'custbody_heart_gtw_resp',
                cvvResultText: 'custbody_heartl_cvv_result_txt',
                cvvResultCode: 'custbody_heartl_cvv_result_code',
                avsResultText: 'custbody_heartl_avs_result_txt',
                avsResultCode: 'custbody_heartl_avs_result_code',
                ccAuthCode: 'custbody_heartl_cc_auth',
                transactionId: 'custbody_heartl_trx_id',
                referenceNumber: 'custbody_heartl_ref_num',

                /* API REQUEST DATA: payment */
                paymentOperation: 'custbody_heartl_payment_operation',
                paymentStatus: 'custbody_heartl_pmt_sts',
                holdError: 'custbody_heartl_hold_error',

                heartlandTransactionId: 'custbody_heartl_transaction'
            }
        },

        error: {
            type: 'customrecord_heartl_error',
            field: {
                transaction: 'custrecord_heartl_err_trans_id',
                record: 'custrecord_hle_transaction_record',
                detail: 'custrecord_heartl_err_detail',
                type: 'custrecord_heartl_err_type',
                reported: 'custrecord_heartl_err_reported',
                logged: 'custrecord_heartl_err_logged',
                notified: 'custrecord_heartl_err_notified'
            },
            language: {
                transactionIdMissing: "400: (User Error) Unable to void/refund, No Transaction Id provided",
                badGatewayResponse: "500: (Server Error) Invalid response from the Gateway"
            }
        }
    };

    var internal_cache = {};

    var getRestUrl = function getRestUrl(charge) {
        if (!internal_cache.rest_url) {
            internal_cache.rest_url = url.resolveScript({
                scriptId: 'customscript_heartl_restlet',
                deploymentId: 'customdeploy1'
            });
        }
        if (charge) {
            internal_cache.rest_url += '&custscript_heartl_api=charge';
        }
        
        return internal_cache.rest_url;
    };

    /* @todo support transaction.currency in v2  
        per shane: Heartland only supports USD through our Portico gateway (what you're currently using), 
        but our Realex gateway through Global Payments supports a wide range of currencies. 
        You can find a list here: https://developer.realexpayments.com/#!/technical-resources/currency-codes. 
        The SDK you're using supports Realex using mostly the same code, but you will need to add support for its configuration.
     */
    var currency = 'USD';

    var hlapi = {

        initialize: function initialize(profile) {
            return getSettings(profile);
        },

        /* Establish API session with Heartland */
        connectToHeartland: function connectToHeartland() {

            try {

                var serviceConfig = new GP.ServicesConfig();
                serviceConfig.secretApiKey = settings.key;
                serviceConfig.serviceUrl = settings.serviceUrl;
                serviceConfig.developerId = settings.developerId;
                serviceConfig.versionNumber = settings.versionNumber;
                GP.ServicesContainer.configure(serviceConfig);
            } catch (err) {
                throw "Unable to connect to Heartland: " + JSON.stringify(err);
            }
        },

        /* Wrapper for RESTlet call to Request a credit card token from Heartland */
        routeMultiUseTokenRequest: function routeMultiUseTokenRequest(creditCard, callback) {
            
            postData = JSON.stringify(creditCard);
            
            var restUrl = getRestUrl();

            // Generate request headers
            var headers = {
                'Content-Type': 'application/json'
            };

            var restOptions = {
                url: restUrl,
                headers: headers,
                body: postData
            };

            // Perform HTTP POST call
            var response = https.post(restOptions);

            return callback(response);
        },


        /* Wrapper for RESTlet call to Charge a credit card */
        routeChargeRequest: function routeChargeRequest(creditCard, callback) {
            
            postData = JSON.stringify(creditCard);
            
            var restUrl = getRestUrl(true);

            // Generate request headers
            var headers = {
                'Content-Type': 'application/json'
            };

            var restOptions = {
                url: restUrl,
                headers: headers,
                body: postData
            };

            // Perform HTTP POST call
            var response = https.post(restOptions);

            return callback(response);
        },

        /* Authorize a transaction (non-zero) with Heartland 
            https://developer.heartlandpaymentsystems.com/Documentation/reference/node-js/classes/creditcarddata.html#authorize
        */
        authorize: function authorize(card, transaction, cb) {

            if (!card.isAuthable) {
                throw "Card is not Authable";
            }

            if (!settings.authorization) {
                throw "Heartland Authorize API is not enabled";
            }

            /* handle zero dollar transactions with verify */
            if (!parseInt(transaction.amount * 100, 10)) {
                return this.verify(card, transaction, cb);
            }

            return card.authorize(transaction.amount)
                .withCurrency(currency)
                .withAddress(transaction.address && transaction.address.processAvs ? (transaction.address) : false)
                .withInvoiceNumber(transaction.number || false)
                .withAllowDuplicates(settings.allowDuplicates || false)
                .execute()
                .then( cb )
            .catch(function(e) {
                Promise.reject( callbacks.handleError(e) );
            });

        },

        /* charge card details with Heartland, used for zero dollar transactions
            https://developer.heartlandpaymentsystems.com/Documentation/reference/node-js/classes/creditcarddata.html#charge
        */
        charge: function charge(card, transaction, cb) {

            if (!card.isChargable) {
                // throw "Card is not chargable";
            }

            if (!settings.charge) {
                throw "Heartland Charge API is not enabled";
            }

            return card.charge(transaction.amount)
                .withCurrency(currency)
                .withInvoiceNumber(transaction.number || false)
                .withAddress(transaction.address && transaction.address.processAvs ? (transaction.address) : {})
                .withAllowDuplicates(settings.allowDuplicates || false)
                .execute()
                .then( cb )
            .catch(function(e){
                Promise.reject( callbacks.handleError(e));
            });
        },

        /* Verify card details with Heartland, used for zero dollar transactions
            https://developer.heartlandpaymentsystems.com/Documentation/reference/node-js/classes/creditcarddata.html#verify
        */
        verify: function verify(card, transaction, cb) {

            if (!card.isVerifyable) {
                throw "Card is not Verifyable";
            }

            if (!settings.verify) {
                throw "Heartland Verify API is not enabled";
            }

            return card.verify(transaction.amount)
                .withCurrency(currency)
                .withAddress(transaction.address && transaction.address.processAvs ? (transaction.address) : false)
                .withAllowDuplicates(settings.allowDuplicates || false)
                .execute()
                .then( cb )
            .catch(function(e){
                Promise.reject( callbacks.handleError(e));
            });
        },

        /* Tokenize credit card details with Heartland
            https://developer.heartlandpaymentsystems.com/Documentation/reference/node-js/classes/creditcarddata.html#tokenize
        */
        tokenize: function tokenize (card, transaction, resp) {

            if (!card.isTokenizable) {
                throw "Card is not tokenizable";
            }

            if (!settings.tokenize) {
                throw "Heartland Tokenize API is not enabled";
            }

            const address = new GP.Address();

            var processAvs = transaction.address.processAvs;
            delete transaction.address.processAvs;

            if (transaction.address.processAvs) {
                address.postalCode = transaction.address.postalCode;
            }

            for (var element in transaction.address) {
                address[element] = transaction.address[element];
            }

            return card.tokenize()
            .withCurrency(currency)
            .withAddress(processAvs ? address : false)
            .withAllowDuplicates(true || settings.allowDuplicates || false)
            .withRequestMultiUseToken(true)
            .execute()
            .then(function (token) {
                log.debug({title: 'token',
                    details: token});

                resp = token;
                transaction.token_raw = token;
                transaction.token = token.token;
                Promise.resolve(token);
                return token;

            }).catch(function(e) {

                Promise.reject(callbacks.handleError(e));
            });
        },

        /* Charge an authorized transaction with Heartland
            https://developer.heartlandpaymentsystems.com/Documentation/reference/node-js/classes/creditcarddata.html#capture
        */
        capture: function capture(transaction, resp, cb) {
            log.debug({title: 'transaction, resp',
                details: [transaction, resp]});

            if (!transaction.transactionId) {
                return callbacks.handleError( config.error.language.transactionIdMissing );
            }

            if (!settings.capture) {
                throw "Heartland Capture API is not enabled";
            }

            return GP.Transaction.fromId(transaction.transactionId)
            .capture(transaction.amount)
            .execute()
            .then(cb).catch(function(e) {
                Promise.reject( callbacks.handleError(e));
            });
        },

        /* void a transaction with Heartland
            https://developer.heartlandpaymentsystems.com/Documentation/reference/node-js/classes/creditcarddata.html#refund
        */
        void: function _void(transaction, resp) {

            if (!transaction.transactionId) {
                throw callbacks.handleError( config.error.language.transactionIdMissing );
            }

            if (!settings.void) {
                throw "Heartland Void API is not enabled";
            }

            return GP.Transaction.fromId(transaction.transactionId)
            .void()
            .execute()
            .then(function(voidResponse) {
                resp = voidResponse;
                Promise.resolve(voidResponse);
                return voidResponse;

            }).catch(function(e){
                Promise.reject( callbacks.handleError(e));
            });
        },

        /* Reverse a transaction with Heartland
            https://developer.heartlandpaymentsystems.com/Documentation/reference/node-js/classes/creditcarddata.html#refund
        */
        reverse: function reverse(transaction, resp) {

            if (!transaction.transactionId) {
                throw callbacks.handleError( config.error.language.transactionIdMissing );
            }

            if (!settings.reverse) {
                throw "Heartland Reverse API is not enabled";
            }

            return GP.Transaction.fromId(transaction.transactionId)
            .reverse(transaction.amount)
            .execute()
            .then(function(reverseResponse) {
                resp = reverseResponse;
                Promise.resolve(reverseResponse);

                return reverseResponse;

            }).catch(function(e){

                Promise.reject( callbacks.handleError(e));
            });
        },

        /* Refund an authorized transaction with Heartland
            https://developer.heartlandpaymentsystems.com/Documentation/reference/node-js/classes/creditcarddata.html#refund
        */
        refund: function refund(transaction, resp, cb) {

            if (!settings.void) {
                throw "Heartland Refund API is not enabled";
            }
            
            return GP.Transaction.fromId(transaction.transactionId)
            .void(transaction.amount)
            .execute()
            .then(cb).catch(function(e){
                Promise.reject( callbacks.handleError(e));
            });
        }
    };

    var callbacks = {

        handleError: function handleError (err, message) {
            err.type = err.name;
            err.details = JSON.stringify(err);
            err.report = true;
            err.logged = true;
            err.notified = config.notifyAdmins;
            err.retries = settings.maxRetries;
            
            // create error record
            log.error({title: 'err.name:' + err.name, details: [runtime.executionContext , err, err.message, err.code]});
  
            var errorRecord = record.create({
                type: config.error.type
            });

            if (settings.notifyAdmins) {
                error.create({
                    name: err.name,
                    message: err.message,
                    notifyOff: false
                });
            }

            /* reported: 'custrecord_heartl_err_reported', logged: 'custrecord_heartl_err_logged', notified: 'custrecord_heartl_err_notified'*/
            errorRecord.setValue({
                fieldId: config.error.field.transaction,
                value: ''
            });
            errorRecord.setValue({
                fieldId: 'name',
                value: err.name
            });
            errorRecord.setValue({
                fieldId: config.error.field.type,
                value: err.code
            });
            errorRecord.setValue({
                fieldId: config.error.field.detail,
                value: JSON.stringify(err)
            });
            
            if (message) {
                errorRecord.setValue({
                    fieldId: config.error.field.transaction,
                    value: JSON.stringify(message)
                });
            }

            errorId = errorRecord.save();

            if (runtime.executionContext == runtime.ContextType.RESTLET) {

                throw(config.error.language.badGatewayResponse + ' Please check the Heartland Error records.');
            }
        }
    };

    // wrapper function to only load settings when necessary
    function getSettings(profile) {
        if (!Object.keys(settings).length) {
            settings = loadSettings(profile);
        }
        return settings;
    }

    // load the heartland settings record and set the settings object and return it
    function loadSettings(profile) {

        if (!profile) {
            var user = runtime.getCurrentUser();
            profile = utils.isProduction()
                ? user.getPreference({name: config.params.sandboxProfile}) 
                : user.getPreference({name: config.params.productionProfile});
        }
   
        var settingsRecord = record.load({
            type: config.record.connection_settings.type,
            id: profile
        });

        var settingsLoaded = {};

        for (var field in config.record.connection_settings.fields) {

            var fieldData = config.record.connection_settings.fields[field];
         
            settingsLoaded[field] = settingsRecord.getValue({fieldId: fieldData.fieldId});
        }

        if (settingsLoaded.allowPartialAmount) {
            config.acceptableResponseCodes.push('10');
        }

        log.debug({title: 'settingsLoaded', details: settingsLoaded});

        settings = settingsLoaded;

        return settings;
    }

    return {
        config: config,
        getRestUrl: getRestUrl,
        hlapi: hlapi,
        settings: settings,
        handleError: callbacks.handleError
    };
});