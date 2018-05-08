/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define([
	'N/record', 
	'N/runtime', 
	'SuiteBundles/Bundle 227444/HeartlandPayments/20180312-globalpayments.api',
	'SuiteBundles/Bundle 227444/HeartlandPayments/Heartland_Application_CM',
	'SuiteBundles/Bundle 227444/HeartlandPayments/Heartland_Utilities_CM'
], function (record, runtime, GP, app, utils) {

	function beforeSubmit(context) {

		var captureResponse = {};
		var resp = {};
		var newRecord = context.newRecord;
		var typesAllowed = [context.UserEventType.CREATE, context.UserEventType.EDIT];

		if (typesAllowed.indexOf(context.type) == -1) {
			return;
		}

		app.hlapi.initialize();

		var paymentOperation = newRecord.getValue({
			fieldId: app.config.transaction.body.paymentOperation
		});

		var billingScheduleCount = newRecord.getLineCount({
			sublistId: 'billingschedule'
		});

		/* if this is not a heartland transaction, we have nothing to do here */
		if (!paymentOperation) {
			return;
		}

		/* recurring payments charge at the cash sale */
		if (paymentOperation == app.config.list.payment_operation.options.RECURRING) {
			return;
		}

		/* don't further process order with billing schedule */
		if (billingScheduleCount && billingScheduleCount > -1) {
			return;
		}

		var doNotStoreCard = newRecord.getValue({
			fieldId: app.config.transaction.body.doNotStoreCard
		});

		var newCCId = newRecord.getValue({
			fieldId: app.config.transaction.body.creditCardId,
		});
		var token = newRecord.getValue({
			fieldId: app.config.transaction.body.ccToken
		});

		/* copy new cc internalid to the select field - record configuration will 
			not allow to save a token marked 'do not store' */
		// newRecord.setValue({
		// 	fieldId: app.config.transaction.body.creditCards,
		// 	value: newCCId
		// });

		var amount = newRecord.getValue({
			fieldId: 'total'
		}) || '0.00';
		var transactionId = newRecord.getValue({fieldId: app.config.transaction.body.transactionId});
		var transaction = {};
		transaction.amount = amount || '0.00';
		transaction.number = newRecord.getValue({fieldId: 'tranid'});
		if (transactionId) {
			transaction.transactionId = transactionId;
		}

		transaction.address = utils.getHeartlandAddress(newRecord, app.config);
		var user = runtime.getCurrentUser();
        var profile = utils.isProduction() 
            ? user.getPreference({name: app.config.params.sandboxProfile}) 
            : user.getPreference({name: app.config.params.productionProfile});

		// var cardHolderName = newRecord.getValue({
		// 	fieldId: app.config.transaction.body.ccHolderName
		// });
        var card = new GP.CreditCardData();
        card.token = token;
    	card.cvn = '';
		// card.cardHolderName = cardHolderName;
		card.expMonth = '';
        card.expYear = '';

        app.hlapi.connectToHeartland(profile);

        log.debug({title: 'Transaction', details: [ transaction, paymentOperation, token]});

		/* handle CC Sale with a charge transaction */
		if ((paymentOperation == app.config.list.payment_operation.options.SALE
			|| paymentOperation == app.config.list.payment_operation.options.CAPTURE)
			&& token
			&& !transaction.transactionId) {

			// card.token = token;
			var chargeResponse = {};
			chargeResponse = app.hlapi.charge(card, transaction, function callback(chargeResponse) {
				resp = chargeResponse;
		        handleApiResponse(newRecord, resp, app.config);

				Promise.resolve(chargeResponse);
			});


	        return;
		}

		if (!token && paymentOperation != app.config.list.payment_operation.options.REFUND) {
			return;
		}

        /* run the void/refund functionality when the payment operation is refund and the transaction is refund */
		if (paymentOperation == app.config.list.payment_operation.options.REFUND
			&& context.newRecord.type == record.Type.CASH_REFUND) {

        	var refundResponse = {};
        	refundResponse = app.hlapi.refund(transaction, refundResponse, function callback(refundResponse) {
				resp = refundResponse;
		        handleApiResponse(newRecord, resp, app.config);

				Promise.resolve(refundResponse);
			});

        	if (refundResponse) {
        		// update this current record with the details of the refund update
        	}
		}

		/* If a transaction id does not exist, then it needs to be authorized */
		else if (!transaction.transactionId) {

			/* This function is passed to the verify/authorize transactions as a callback to the promise used to hit the API */
			var captureCallback = function(authorization) {

				resp = authorization;
				transaction.transactionId = authorization.transactionReference.transactionId;

            	if (paymentOperation != app.config.list.payment_operation.options.CAPTURE) {
            		Promise.resolve(authorization);
	                log.debug({title: 'authorization', details: authorization});

            		return;
            	}

            	captureResponse = app.hlapi.capture(transaction, resp, function callback(captureResponse) {
            		log.debug({title: 'cb2 captureResponse', details: captureResponse});
					resp = captureResponse;
			        handleApiResponse(newRecord, resp, app.config);

					Promise.resolve(captureResponse);
				});

            	Promise.resolve(captureResponse);
            };

			try {

                // authorize the card
                app.hlapi.authorize(card, transaction, captureCallback);

        	} catch(err) {

        		throw app.handleError(err);
        	}

		} else {

			/* transaction id already exists, capture if applicable */
			try {

            	if (paymentOperation != app.config.list.payment_operation.options.CAPTURE) {
            		return;
            	}

            	captureResponse = app.hlapi.capture(transaction, resp, function callback(captureResponse) {
            		log.debug({title: 'cb1 captureResponse', details: captureResponse});
					resp = captureResponse;
			        handleApiResponse(newRecord, resp, app.config);

					Promise.resolve(captureResponse);
				});

			} catch(err) {
                log.error({title: 'previously authorized error', details: JSON.stringify(err)});
			}
        }

        try{
	        handleApiResponse(newRecord, resp, app.config);
	    } catch(e){
	        log.debug({title: 'e', details: JSON.stringify(e)});
	    }
	}

	/* @todo figure out how to run this code more efficiently, */
	function afterSubmit(context) {
		var typesAllowed = [context.UserEventType.CREATE, context.UserEventType.EDIT];

		if (typesAllowed.indexOf(context.type) == -1) {
			return;
		}

		var newRecord = context.newRecord;
        var heartlandTransactionId = newRecord.getValue({
            fieldId: app.config.transaction.body.heartlandTransactionId
        });
        log.debug({title: 'heartlandTransactionId', details: heartlandTransactionId});
        var updateValues = [];
        updateValues[app.config.record.transaction.field.transaction] = newRecord.id;
        var updateOptions = {
        	type: app.config.record.transaction.type,
        	id: heartlandTransactionId,
        	values: updateValues
        };
        log.debug({title: 'updateOptions', details: updateOptions});
        record.submitFields(updateOptions);
	}

	/* update record on good response and throw errors on bad response */
    function handleApiResponse(newRecord, resp, cfg) {
        log.debug({title: 'resp', details: resp});

		if (!resp) {
			throw app.config.language.noGatewayResponse;
		}

		if (app.config.acceptableResponseCodes.indexOf(resp.responseCode) == -1) {
			throw app.config.language.unacceptableResponseHeader + resp.responseMessage;
		}

        /* update the record with the successful Heartland API response */
		utils.updateNewRecord(newRecord, resp, cfg);

    }

	/**
	 * Select and disable the refund field if there is no transaction id so
	 */
	function disableField(scriptContext, fieldId) {

		var fieldObject = scriptContext.newRecord.getField({fieldId: fieldId});
		var transactionId = scriptContext.newRecord.getValue({fieldId: app.config.transaction.body.transactionId});
		
		if (transactionId) {
			fieldObject.isDisabled = true;
		} else {
			fieldObject.isDisabled = false;
		}
	}

	return {
		beforeSubmit: beforeSubmit,
		afterSubmit: afterSubmit
	};
});