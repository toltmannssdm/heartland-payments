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
], function (currentRecord, record, search, url, https, GP, Heartland, app, utils) {//

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

			try {
				establishHeartlandIframes();
			} catch(e) {
				app.handleError(e);
				alert('There was a problem creating a secure connection to Heartland. Try again.');
			}

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
	        currentRecordObject.setValue({fieldId: app.config.transaction.body.ccToken, value: resp.token_value});
	        currentRecordObject.setValue({fieldId: app.config.transaction.body.cardType, value: resp.card_type});
	        currentRecordObject.setValue({fieldId: app.config.transaction.body.creditCardNumber, value: resp.card.number});
	        currentRecordObject.setValue({fieldId: 'custbody_heartl_iframe', value: ''});
	        iframeField = currentRecordObject.getField({fieldId: 'custbody_heartl_iframe'});
	        console.log('should have cleared the iframe', iframeField, currentRecordObject);
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
			var paymentMethod = currentRecord.getValue({
				fieldId: 'paymentmethod'
			});
			var cardType = currentRecord.getValue({
				fieldId: app.config.transaction.body.cardType
			});
			var postalCode = currentRecord.getValue({
				fieldId: app.config.transaction.body.address.postalCode
			});
			var paymentOperation = currentRecord.getValue({
				fieldId: app.config.transaction.body.paymentOperation
			});
			var transactionId = currentRecord.getValue({
				fieldId: app.config.transaction.body.transactionId
			});
			var transaction = {
				amount: currentRecord.getValue({
					fieldId: 'total'
				})
			};
			var doNotStoreCard = currentRecord.getValue({
				fieldId: app.config.transaction.body.doNotStoreCard
			});
			var lineItemCount = currentRecord.getLineCount({sublistId: 'item'});
			var token = currentRecord.getValue({
				fieldId: app.config.transaction.body.ccToken
			});
			var processAvs = currentRecord.getValue({
				fieldId: app.config.transaction.body.address.processAvs
			});

			if (!lineItemCount) {
				alert(app.config.language.noItemsOnTransaction);
				return false;
			}

			/* if the transaction id is populated, there is an active authorization in place for the order
			@todo verify the amount */
			if (transactionId) {
				return true;
			}

			/* exit if no payment method set and payment Operation not set */
			if (!paymentMethod && !paymentOperation) {
				return true;
			}

			/* Amex cards require postal code */
			if (cardType == app.config.cardTypes.AmericanExpress) {
				if (!postalCode) {
					var message = 'Postal Code is required.';
					var additionalText = ' Check the Process AVS checkbox.';
					alert(message + (!processAvs ? additionalText : ''));
					return false;
				}
			}

			// set the payment operation after payment method is finalized
			setDefaultPaymentOperation(currentRecord, true);

			var paymentOperationText = currentRecord.getText({
				fieldId: app.config.transaction.body.paymentOperation
			});

			var heartlandccData = buildHeartlandTokenRequest(currentRecord);

			log.debug({title: 'heartlandccData', details: heartlandccData});

			/* mask the card number */
			var maskedCardNumber = maskCardNumber(heartlandccData.number);

			/* confirm with the user that the card is about to be authorized for the given amount */
			if (!confirm( "Process " + paymentOperationText + " on " + heartlandccData.cardHolderName + " " + cardType + " card " + heartlandccData.number + "?" )) {
				return false;
			}
			log.debug({title: 'doNotStoreCard', details: doNotStoreCard});

			/* If the Do not store checkbox is marked, mark the token record as such */
			if (doNotStoreCard) {

				heartlandccData.oneTimeUse = true;

				// create/update the token record 
		        response.ccId = utils.addToken(heartlandccData);
		        updateHeartlandBodyFields(currentRecord, response);

				return true;
			}
			log.debug({title: 'heartlandccData.token.indexOf(/supt/)', details: [heartlandccData.token, heartlandccData.token.indexOf('supt')]});

			/* if we already have a multiuse token, don't retokenize it */
			if (heartlandccData.token && heartlandccData.token.indexOf('supt') == -1) {
				return true;
			}

			/* Send a request to Heartland to tokenize the single use token, firing the callback on success */
			return app.hlapi.routeMultiUseTokenRequest(heartlandccData, function callback(tokenResponse) {
				
				var response = validateClientResponse(tokenResponse);
				
				if (!response) {
					Promise.reject(response);
					return false;
				}

				heartlandccData.token = response.token;

				/* create/update the token record */
		        response.ccId = utils.addToken(heartlandccData);


		        currentRecord.setValue({fieldId: app.config.transaction.body.ccToken, value: response.token});

		        updateHeartlandBodyFields(currentRecord, response);
		        Promise.resolve(tokenResponse);
				return true;
			});

		} catch(e) {
			window.console && console.error(JSON.stringify(e), e);
			throw app.handleError(e);
		}
		return false;
	};

	setHeartlandPaymentMethod = function setHeartlandPaymentMethod(recordObject) {
		recordObject.setValue({
			fieldId: 'paymentmethod',
			value: settings.heartlandPaymentMethodId
		});
	};

	/* given the current record and the API response, update the response fields */
    updateHeartlandBodyFields = function updateHeartlandBodyFields(recordObject, response) {
		log.debug({title: 'response', details: response});

		var options = {};

		if (response.token) {
	    	options = {
				fieldId: app.config.transaction.body.ccToken,
				value: response.token
			};

			log.debug({title: 'options', details: options});
	    	
			/* set the token and response info on the current transaction */
			// this is addressed
			recordObject.setValue(options);
		}

		if (response.ccId) {

			options = {
				fieldId: app.config.transaction.body.creditCardId,
				value: response.ccId
			};
			log.debug({title: 'options', details: options});
			recordObject.setValue(options);
		}

    };

	/* Make sure that the response was valid, and handle errors */
	validateClientResponse = function validateClientResponse(response) {
		var responseBody = response.body;
		
		log.debug({title: 'client response', details: response});
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
	buildHeartlandTokenRequest = function buildHeartlandTokenRequest(currentRecord) {

		return {
			expMonth: '',
			expYear: '',
			custId: currentRecord.getValue({
				fieldId: 'entity'
			}) || currentRecord.getValue({
				fieldId: 'customer'
			}),
			cardType: currentRecord.getValue({
				fieldId: app.config.transaction.body.cardType
			}),
			number: currentRecord.getValue({
				fieldId: app.config.transaction.body.creditCardNumber
			}),
			token: currentRecord.getValue({
				fieldId: app.config.transaction.body.ccToken
			}),
			amount: currentRecord.getValue({
				fieldId: 'total'
			}) || '0.00',
			cardHolderName: currentRecord.getValue({
				fieldId: app.config.transaction.body.ccHolderName
			}),
			operation: 'DO_CC_AUTH',
			address: utils.getAddress(currentRecord, app.config)
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

	/** 
	 * Function triggered when a field value changes.
	 *
	 * @param {Object} scriptContext
	 * @param {N/record.Record} scriptContext.currentRecord
	 */
	fieldChanged = function fieldChanged(scriptContext) {

		try {

			var currentRecord = scriptContext.currentRecord;
			var fieldId = scriptContext.fieldId;
			var fieldValue = currentRecord.getValue({fieldId: fieldId});
			var paymentMethod = currentRecord.getValue({fieldId: 'paymentmethod'});

			/* Toggle address fields displaytype regardless of fieldValue */
			if (fieldId == app.config.transaction.body.address.processAvs) {
				toggleAddressFields(currentRecord, fieldValue);
			}

			/* Always allow fields to be cleared */
			if (!fieldValue || !fieldId) {
				return true;
			}

			/* when the cctoken is populated disable the stored checkbox */
			if (fieldId == app.config.transaction.body.ccToken) {
				var fieldObject = currentRecord.getField({fieldId: app.config.transaction.body.doNotStoreCard});
				fieldObject.isDisabled = !!fieldValue;
			}

			/* When the customer field is set, check if it should default the Heartland payment method */
			else if (fieldId == 'entity') {

				if (settings.autoSetHeartlandDefaultPayment) {
					setDefaultPaymentOperation(currentRecord);
					return true;
				}

				var lookupFields = search.lookupFields({
					type: search.Type.CUSTOMER,
					id: fieldValue,
					columns: [app.config.entity.defaultCard]
				});

				var fieldOptions = {
					fieldId: app.config.transaction.body.creditCards,
					value: lookupFields[app.config.entity.defaultCard][0].value
				};

				/* Delay setting the CC, because NetSuite is attempting to source in the default CC data */
				setTimeout(function(){currentRecord.setValue(fieldOptions);}, 1500);
			}

			/* Clear the Heartland CC selector when payment method changes to something other than Heartland */
			else if (fieldId == 'paymentmethod') {

				if (!pageInitialized) {
					return true;
				}

				var currentPaymentMethod = currentRecord.getValue({fieldId: 'paymentmethod'});

				if (currentPaymentMethod && currentPaymentMethod != settings.heartlandPaymentMethodId) {

					return clearHeartlandFields(currentRecord);
				}
			}

			/* If a change happens in Heartland CC field, make sure the Heartland payment method is set */
			else if (fieldId == app.config.transaction.body.creditCardNumber) {

				if (paymentMethod != settings.heartlandPaymentMethodId) {

					setHeartlandPaymentMethod(currentRecord);
				}
				
				return true;
			}

			/* Handle field driven field reset */
			else if (fieldId == app.config.transaction.body.reset) {

				var returnValue = clearHeartlandFields(currentRecord);

				currentRecord.setValue({
					fieldId: app.config.transaction.body.reset,
					value: false,
					ignoreFieldChange: true
				});

				return returnValue;
			}


			else if (fieldId == app.config.transaction.body.creditCards) {

				options = {
					fieldId: app.config.transaction.body.creditCardId,
					value: fieldValue
				};
				log.debug({title: 'options', details: options});
				currentRecord.setValue(options);
			}

		} catch(e) {
			window.console && console.error(JSON.stringify(e), e);
			throw app.handleError(e);
		}
		
		return true;
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
		fieldChanged: fieldChanged
	};
});