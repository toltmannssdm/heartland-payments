/**
 * Created by huzaifa.sultanali on 12/15/2017.
 */

/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define([
    'N/log',
    'N/record',
    'N/runtime',
    'N/search',
    'SuiteBundles/Bundle 227444/HeartlandPayments/20180312-globalpayments.api',
    'SuiteBundles/Bundle 227444/HeartlandPayments/Heartland_Application_CM',
    'SuiteBundles/Bundle 227444/HeartlandPayments/Heartland_Utilities_CM'
], function (log, record, runtime, search, GP, app, utils) {

    var settings = app.hlapi.initialize();

    var doTests = false;
    var testResults = {};

    function runTests(multiuse) {

        multiusestr = multiuse ? ' - multiuse' : ' - single';
        establishConnection();

        certs.forEach(function(test, i, a) {

            var response = '';

            var cardData = typeof test.card == 'number' && testResults[test.card+multiusestr] ? testResults[test.card+multiusestr].card : cards[test.card];

            if (!cardData) {
                log.error({title: 'unable to process', details: e});
                return;
            }

            var card =  new GP.CreditCardData();
            card.number = '';
            card.cvn = '';
            card.expMonth = '';
            card.expYear = '';
            card.cardHolderName = 'Cert #' + test.number;

            var transaction = {
                amount: test.amount,
                currency: 'USD',
                address: address,
                number: 'Test Number ' + test.number
            };

            if (test.transactionId) {

                var result = testResults[test.transactionId+multiusestr].response._result;
                if (result.transactionReference) {
                    transaction.transactionId = result.transactionReference.transactionId;
                }
            }

            /* refer to the previously tokenized card details */
            if (typeof test.card == 'number') {
                var result = testResults[test.card+multiusestr].response._result;
                card.token = result.token;
            } 

            try {
                log.audit({title: 'test', details: test});

                switch(test.transaction) {

                    case 'tokenize':

                        card.number = cardData.number;
                        card.expMonth = cards.expMonth;
                        card.expYear = cards.expYear;
                        card.cvn = cardData.csc;
                        card.cardHolderName = 'Cert #' + test.number;

                        var address = new GP.Address();
                        if (test.zipcode) {
                            address.postalCode = test.zipcode;
                            address.processAvs = true;
                        }
                        if (test.street1) {
                            address.streetAddress1 = test.street1;
                            address.processAvs = true;
                        }
                        transaction.address = address;

                        response = app.hlapi.tokenize(card, transaction, response);
                        break;
                    

                    case 'authorize':

                        cb = function(authresponse) {
                            
                            Promise.resolve(authresponse);
                            
                            if (test.capture) {
                                captureresponse = app.hlapi.capture(authresponse, transaction, response);
                                Promise.resolve(captureresponse);
                                return captureresponse;
                            };
                            return authresponse;
                        }

                        response = app.hlapi.authorize(card, transaction, cb);
                        break;
                    
                    case 'charge':

                        // cert testing does not require this to be tokenized, so we have to use the card number
                        if (test.card == 'jcb') {
                            card.number = cardData.number;
                            card.expMonth = cards.expMonth;
                            card.expYear = cards.expYear;
                            card.cvn = cardData.csc;
                        } else {
                            card.token = result.token;
                        }

                        response = app.hlapi.charge(card, transaction, response);
                        break;
                    
                    case 'reverse':
                        response = app.hlapi.reverse(card, transaction, response);
                        break;
                    
                    case 'refund':
                        response = app.hlapi.refund(transaction, response);
                        break;
                    
                }

                testResults[test.number+multiusestr] = {
                    card: card,
                    cert: test,
                    response: response
                };

            } catch(err) {
                testResults[test.number+multiusestr] = {
                    card: card,
                    cert: test,
                    error: JSON.stringify(err)
                };

                log.error({title: 'testResults', details: testResults});

                return;
            }

        });

        return testResults;
    }

    function post(requestBody) {

        if (doTests || requestBody === 999) {
            return runTests(true) && runTests(false);
        }

        try {

            var result = postToHeartland(requestBody);

            return result;
        } catch(e) {

            log.error({title: 'postToHeartland failed', details: [JSON.stringify(e), e]});
            throw e;
        }
    }

    function postToHeartland(requestBody) {

        establishConnection();

        var rec, resp = {};

        var ccData = JSON.parse(requestBody);

        var card = new GP.CreditCardData();

        var address = new GP.Address();

        for (var addressField in ccData.address) {

            var addressValue = ccData.address[addressField];

            address[addressField] = addressValue;
        }

        if (ccData.operation != 'DO_CC_AUTH' && ccData.operation != 'TOKENIZE') {
            return;
        }

        card.token = ccData.token;

        var transaction = {
            currency: 'USD',
            address: address,
            // amount: ccData.amount,
            token_raw: null
        };

        log.debug({title: 'transaction, ccData', details: [transaction, ccData]});

        var token = app.hlapi.tokenize(card, transaction, resp);

        /* @note not sure why I had to access via _result, could be misuse of promise */
        resp = token._result;

        resp = resp || {};

        return JSON.stringify(resp);
    }

    function establishConnection() {
        var user = runtime.getCurrentUser();

        var profile = utils.isProduction() 
            ? user.getPreference({name: app.config.params.sandboxProfile}) 
            : user.getPreference({name: app.config.params.productionProfile});

        app.hlapi.connectToHeartland(profile);
    }

    /**

            This is the certification testing data

    **/
    var cards = {
        visa: {
            number: 4012002000060016,
            csc: 123
        },
        mastercard: {
            number: 5473500000000014,
            csc: 123
        },
        discover: {
            number: 6011000990156527,
            csc: 123
        },
        americanexpress: {
            number: 372700699251018,
            csc: 1234
        },
        jcb:{
            number: 3566007770007321,
            csc: 123
        },
        expMonth: 12,
        expYear: 2020
    };

    var address = {
        zipcode: 75024,
        zipcodeplus4: 750241234,
        streetnumber: 6860 ,
        streetaddress: '6860 Dallas Pkwy'
    };

    var certs = [
        {
            number: 1,
            card: 'visa',
            amount: 0.00,
            transaction: 'tokenize',
            zipcode: address.zipcode,
            street1: address.streetaddress
        },
        {
            number: 2,
            card: 'mastercard',
            amount: 0.00,
            transaction: 'tokenize',
            zipcode: address.zipcode,
            street1: address.streetnumber
        },
        {
            number: 3,
            card: 'discover',
            amount: 0.00,
            transaction: 'tokenize',
            zipcode: address.zipcodeplus4,
            street1: address.streetnumber
        },
        {
            number: 4,
            card: 'americanexpress',
            amount: 0.00,
            transaction: 'tokenize',
            zipcode: address.zipcode,
            street1: address.streetaddress
        },


        {
            number: 6,
            card: 1,
            amount: 13.01,
            transaction: 'charge',
            zipcode: address.zipcode,
            street1: address.streetaddress
        },
        {
            number: 7,
            card: 2,
            amount: 13.02,
            transaction: 'charge',
            zipcode: address.zipcode,
            street1: address.streetnumber
        },
        {
            number: 8,
            card: 3,
            amount: 13.03,
            transaction: 'charge',
            zipcode: address.zipcodeplus4,
            street1: address.streetnumber
        },
        {
            number: 9,
            card: 4,
            amount: 13.04,
            transaction: 'charge',
            zipcode: address.zipcode,
            street1: address.streetaddress
        },


        {
            number: 10,
            card: 1,
            amount: 17.01,
            transaction: 'charge',
            zipcode: address.zipcode,
            street1: address.streetaddress
        },
        {
            number: 11,
            card: 2,
            amount: 17.02,
            transaction: 'charge',
            zipcode: address.zipcode,
            street1: address.streetnumber
        },
        {
            number: 12,
            card: 3,
            amount: 17.03,
            transaction: 'charge',
            zipcode: address.zipcodeplus4,
            street1: address.streetnumber
        },
        {
            number: 13,
            card: 4,
            amount: 17.04,
            transaction: 'charge',
            zipcode: address.zipcode,
            street1: address.streetaddress
        },
        {
            number: 14,
            card: 'jcb',
            amount: 17.05,
            transaction: 'charge',
            zipcode: address.zipcode,
            street1: address.streetaddress
        },


        {
            number: 15,
            card: 1,
            amount: 17.06,
            transaction: 'authorize',
            zipcode: address.zipcode,
            street1: address.streetaddress,
            capture: true
        },
        {
            number: 16,
            card: 2,
            amount: 17.07,
            transaction: 'authorize',
            zipcode: address.zipcode,
            street1: address.streetaddress,
            capture: true
        },
        {
            number: 17,
            card: 3,
            amount: 17.08,
            transaction: 'authorize',
            zipcode: address.zipcode,
            street1: address.streetaddress,
            capture: false /* DO NOT CAPTURE */
        },

        {
            number: 34,
            card: 2,
            amount: -15.15,
            transaction: 'reverse', // need to retest
            params: '16a',
            zipcode: address.zipcode,
            street1: address.streetaddress
        },
        {
            number: 35,
            card: 1,
            amount: 17.01,
            transaction: 'refund',
            transactionId: 10,
            params: 10
        }
    ];

    /* end test data */

    return {
        post: post
    };

});