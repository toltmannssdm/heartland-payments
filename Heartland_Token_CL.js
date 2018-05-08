/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define([
	'N/currentRecord',
	'N/record',
	'N/search',
	'N/url',
	'N/https',
	'SuiteBundles/Bundle 227444/HeartlandPayments/20180312-globalpayments.api',
	'SuiteBundles/Bundle 227444/HeartlandPayments/20180404-securesubmit',
	'SuiteBundles/Bundle 227444/HeartlandPayments/Heartland_Application_CM',
	'SuiteBundles/Bundle 227444/HeartlandPayments/Heartland_Utilities_CM'
], function (currentRecord, record, search, url, https, GP, Heartland, app, utils) {

	var userInitialized = false;
	var pageInitialized = false;
	var scriptContext = {};
	var heartlandTransactionBodyFields = {};
	var settings = {};
	var initialPaymentMethod = '';
	var lastPaymentMethod = '';
	var paymentOperation = '';

	/**
	 * Function triggered when record is loaded in the UI
	 *
	 * @param {Object} scriptContext
	 * @param {N/record.Record} scriptContext.currentRecord
	 */
	pageInit = function pageInit(scriptContext) {
		try {

			settings = app.hlapi.initialize();

			heartlandTransactionBodyFields = Object.values(app.config.transaction.body);
			lastPaymentMethod = scriptContext.currentRecord.getValue({fieldId: 'paymentmethod'});
			initialPaymentMethod = lastPaymentMethod;

			/* if this field is not set, set it */
			paymentOperation = scriptContext.currentRecord.getValue({
				fieldId: app.config.transaction.body.paymentOperation
			});

			establishHeartlandIframes();

			/* if pmt op is not set and not using heartland payment method, it's a non-heartland transaction */
			if (!paymentOperation && !isHeartlandPayment(lastPaymentMethod)) {
				return;
			}

			/* if paymentOperation and there is already a transaction with this operation, hide/disable all the fields and bypass elsewhere */

			setDefaultPaymentOperation(scriptContext.currentRecord);

			/* when initializing, refer to the system setting for AVS */
			toggleAddressFields(scriptContext.currentRecord, settings.authorizeWithAvs );

		} catch(e) {
			window.console && console.error(JSON.stringify(e), e);
			throw app.handleError(e);
		}

		pageInitialized = true;
	};

	establishHeartlandIframes = function establishHeartlandIframes() {

		/* callbacks for the HPS connection */
		function success(resp) {
	        var currentRecordObject = currentRecord.get();
	        currentRecordObject.setValue({fieldId: app.config.record.tokens.field.token, value: resp.token_value});
	        currentRecordObject.setValue({fieldId: app.config.record.tokens.field.cardtype, value: resp.card_type});
	        currentRecordObject.setValue({fieldId: 'name', value: resp.card.number});
	    }
	    function failure(resp) {
	        alert('There was an error: ' + resp.error.message);
	    }

	    var hps = utils.createHeartlandHPSConnection(Heartland, success, failure, settings.publicKey);

	    utils.addHPSSubmitHandler(Heartland, hps, settings.publicKey);

	};

	/* given a transaction record, set the default heartland payment Operation */
	setDefaultPaymentOperation = function setDefaultPaymentOperation(transaction, preventOverwrite) {

		var defaultPaymentOperation = getDefaultPaymentOperation(transaction.type);
		var currentPaymentOperation = transaction.getValue({
			fieldId: app.config.transaction.body.paymentOperation
		});

		if (preventOverwrite && currentPaymentOperation) {
			return;
		}

		/* Automatically assign the appropriate payment operation if the Heartland payment method is selected */
		transaction.setValue({
			fieldId: app.config.transaction.body.paymentOperation,
			value: defaultPaymentOperation
		});
	};

	/** 
	 * Function triggered when record is saved
	 *
	 * @param {Object} scriptContext
	 * @param {N/record.Record} scriptContext.currentRecord
	 */
	saveRecord = function saveRecord(scriptContext) {

		try {

			var currentRecord = scriptContext.currentRecord;

			var onetimeuse = currentRecord.getValue({
				fieldId: app.config.record.tokens.field.onetimeuse
			});

			/* If the onetimeuse checkbox is marked the record is complete */
			if (onetimeuse) {

				return true;
			}

			var heartlandccData = buildHeartlandTokenRequest(currentRecord);

			/* Send a request to Heartland to tokenize the single use token, firing the callback on success */
			return app.hlapi.routeMultiUseTokenRequest(heartlandccData, function callback(tokenResponse) {
				
				var response = validateClientResponse(tokenResponse);
			
				if (!response) {
					Promise.reject(response);
					return false;
				}

				heartlandccData.token = response.token;

				currentRecord.setValue({
					fieldId: app.config.record.tokens.field.token,
					value: heartlandccData.token
				});

		        Promise.resolve(tokenResponse);
				return true;
			});


		} catch(e) {

			window.console && console.error(JSON.stringify(e), e);
			
			throw app.handleError(e);
		}
		return true;
	}

	/* Make sure that the response was valid, and handle errors */
	validateClientResponse = function validateClientResponse(response) {
		var responseBody = response.body;

		if (!responseBody) {
			alert(app.config.language.noGatewayResponse);
			return false;
		}

		if (responseBody.indexOf('error') != -1) {
			app.handleError(responseBody);
			alert(app.config.language.generalError + ' ' + responseBody);
			return false;
		}

		/* parse the response if necessary */
		if (typeof responseBody == 'string') {
			responseBody = JSON.parse(responseBody);
		}

		/* handle bad gateway response */
		if (!responseBody) {
			alert(app.config.language.noGatewayResponse);
			return false;
		}

		/* reject unacceptable response codes */
		if (app.config.acceptableResponseCodes.indexOf(responseBody.responseCode) == -1) {
			alert(app.config.language.unacceptableResponseHeader + JSON.stringify(responseBody));
			return false;
		}

		return responseBody;
	};

	/* applies asterisks to mask the card data */
	maskCardNumber = function maskCardNumber(number) {

		number = String(number);
		if (typeof number == 'undefined' || !number) {
			return '****************';
		}
		return number.replace(/.(?=.{4,}$)/g, '*');
	};

	/**
	 * Parse the current record to generate the request data for the card tokenization
	 */
	buildHeartlandTokenRequest = function buildHeartlandTokenRequest(currentRecordObject) {

		return {
			expMonth: '',
			expYear: '',
			custId: currentRecordObject.getValue({
				fieldId: app.config.record.tokens.field.customer
			}),
			cardType: currentRecordObject.getValue({
				fieldId: app.config.record.tokens.field.cardtype
			}),
			number: currentRecordObject.getValue({
				fieldId: 'name'
			}),
			token: currentRecordObject.getValue({
				fieldId: app.config.record.tokens.field.token
			}),
			cardHolderName: currentRecordObject.getValue({
				fieldId: app.config.record.tokens.field.ccname
			}),
			lastName: currentRecordObject.getValue({
				fieldId: app.config.record.tokens.field.lastname
			}),
			operation: 'TOKENIZE',
			address: utils.getCustomRecordAddress(currentRecordObject, app.config)
		};
	};

	/* determine the payment operation value to populate based on the transaction */
	getDefaultPaymentOperation = function getDefaultPaymentOperation(type) {
		switch (type) {
			case record.Type.SALES_ORDER:
				return app.config.list.payment_operation.options.AUTHORIZE;
			break;
			case record.Type.CASH_REFUND:
				return app.config.list.payment_operation.options.REFUND;
			break;
			case record.Type.CASH_SALE:
				return app.config.list.payment_operation.options.CAPTURE;
			break;
			case record.Type.CUSTOMER_PAYMENT:
				return app.config.list.payment_operation.options.CAPTURE;
			break;
			default: {
				throw "500: No default payment operation for type: " + type;
			}
		}
	};

	/* we need to clear/disable the address fields, need to include the adress fields in the update */
	toggleAddressFields = function toggleAddressFields(currentRecord, avsEnabled) {

		for (var field in app.config.transaction.body.address) {

			/* don't hide the process avs field */
			if (app.config.transaction.body.address[field] == app.config.transaction.body.address.processAvs) {
				continue;
			}
			var screenField = app.config.transaction.body.address[field];
			var fieldObject = currentRecord.getField({fieldId: screenField});
			var isDisabled = fieldObject.isDisabled;
			var isDisplay = fieldObject.isDisplay;
			
			fieldObject.isDisplay = avsEnabled;
			fieldObject.isVisible = avsEnabled;
			fieldObject.isDisabled = !avsEnabled;
			
			if (!avsEnabled) {
				fieldObject.defaultValue = '';
			}
		}
	};

	/* Handle resetting all the Heartland fields on this transaction */
	clearHeartlandFields = function clearHeartlandFields (currentRecord) {

		heartlandTransactionBodyFields.forEach(function(field, index, arrayInput) {

			if (typeof field != 'string') {
				return;
			}

			var FieldOptions = {
				fieldId: field,
				value: ''
			};
			
			try {

				/* don't unset the field that was just set/unset */
				if (FieldOptions.fieldId == app.config.transaction.body.reset
					|| FieldOptions.fieldId == app.config.transaction.body.doNotStoreCard) {
					FieldOptions.skipped = true;

					return true;
				}

				currentRecord.setValue(FieldOptions);
			} catch(e) {
				window.console && console.error('e', JSON.stringify(e));

				// above setValue function call fails when the field type is checkbox, so handle checkbox here
				FieldOptions.value = true;
				currentRecord.setValue(FieldOptions);
			}
		});
		
		return true;
	};

	/* Check the transaction paymentmethod, if it is not, and is refundable, clear the heartland fields @todo review this */
	isHeartlandPayment = function isHeartlandPayment(paymentmethod) {

		if (!paymentmethod) {
			return false;
		}

		var currentRec = currentRecord.get();
		var refunded = false;

		//	if there is no heartland payment information set, or the transaction is already refund, return
		var isRefundable = true;
		
		if (paymentmethod != settings.heartlandPaymentMethodId && currentRec.type === record.Type.CASH_REFUND) {
		
			isRefundable = true;
		}

		// reset heartland billing fields
		if (!refunded && isRefundable) {
			currentRec.setValue({
				fieldId: app.config.transaction.body.reset,
				value: true
			});
		}

		/* has the order already been refunded? we need to record that transaction's id */
		return isRefundable && !refunded;
	};

	return {
		pageInit: pageInit,
		saveRecord: saveRecord,
	};
});