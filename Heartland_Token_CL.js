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

	    // Create a new `HPS` object with the necessary configuration
	    var hps = new Heartland.HPS({
	      publicKey: settings.publicKey,
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
	      onTokenSuccess: function (resp) {
	      	console.log(resp);
	        var currentRecordObject = currentRecord.get();
	      	console.log(currentRecordObject);
	      	console.log(app);
	      	console.log(app.config);
	      	console.log(app.config.record.tokens);
	        currentRecordObject.setValue({fieldId: app.config.record.tokens.field.token, value: resp.token_value});
	        currentRecordObject.setValue({fieldId: app.config.record.tokens.field.cardtype, value: resp.card_type});
	        currentRecordObject.setValue({fieldId: 'name', value: resp.card.number});
	      },
	      // Callback when an error is received from the service
	      onTokenError: function (resp) {
	        alert('There was an error: ' + resp.error.message);
	      }
	    });

	    // Attach a handler to interrupt the form submission
	    Heartland.Events.addHandler(document.getElementById('heartlandsubmit'), 'click', function (e) {
	      
	      e.preventDefault();
	      
	      // Tell the iframes to tokenize the data
	      hps.Messages.post(
	        {
	          accumulateData: true,
	          action: 'tokenize',
	          message: settings.publicKey
	        },
	        'cardNumber'
	      );
	    });
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
			console.log(app);
			console.log(app.config);
			console.log(app.config.record);

			var onetimeuse = currentRecord.getValue({
				fieldId: app.config.record.tokens.field.onetimeuse
			});

			/* If the onetimeuse checkbox is marked the record is complete */
			if (onetimeuse) {

				return true;
			}

			var heartlandccData = buildHeartlandTokenRequest(currentRecord);

			console.log(heartlandccData);

			/* Send a request to Heartland to tokenize the single use token, firing the callback on success */
			return app.hlapi.routeMultiUseTokenRequest(heartlandccData, function callback(tokenResponse) {
				
				var response = validateClientResponse(tokenResponse);
			
				console.log(response);

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
	// 		var paymentMethod = currentRecord.getValue({
	// 			fieldId: 'paymentmethod'
	// 		});
	// 		var cardType = currentRecord.getValue({
	// 			fieldId: app.config.transaction.body.cardType
	// 		});
	// 		var postalCode = currentRecord.getValue({
	// 			fieldId: app.config.transaction.body.address.postalCode
	// 		});
	// 		var paymentOperation = currentRecord.getValue({
	// 			fieldId: app.config.transaction.body.paymentOperation
	// 		});
	// 		var transactionId = currentRecord.getValue({
	// 			fieldId: app.config.transaction.body.transactionId
	// 		});
	// 		var transaction = {
	// 			amount: currentRecord.getValue({
	// 				fieldId: 'total'
	// 			})
	// 		};
	// 		var lineItemCount = currentRecord.getLineCount({sublistId: 'item'});
	// 		var token = currentRecord.getValue({
	// 			fieldId: app.config.transaction.body.ccToken
	// 		});
	// 		var processAvs = currentRecord.getValue({
	// 			fieldId: app.config.transaction.body.address.processAvs
	// 		});

	// 		if (!lineItemCount) {
	// 			alert(app.config.language.noItemsOnTransaction);
	// 			return false;
	// 		}

	// 		/* if the transaction id is populated, there is an active authorization in place for the order
	// 		@todo verify the amount */
	// 		if (transactionId) {
	// 			return true;
	// 		}

	// 		/* exit if no payment method set and payment Operation not set */
	// 		if (!paymentMethod && !paymentOperation) {
	// 			return true;
	// 		}

	// 		/* Amex cards require postal code */
	// 		if (cardType == app.config.cardTypes.AmericanExpress) {
	// 			if (!postalCode) {
	// 				var message = 'Postal Code is required.';
	// 				var additionalText = ' Check the Process AVS checkbox.';
	// 				alert(message + (!processAvs ? additionalText : ''));
	// 				return false;
	// 			}
	// 		}

	// 		/* if the heartland payment method is not set, but there is a Payment Operation set, confirm with the user */
	// 		if (paymentMethod != settings.heartlandPaymentMethodId) {
	// 			var automaticallySetHeartlandPaymentMethod = confirm(app.config.language.paymentMethodIsNotHeartland);//) {

	// 			if (!automaticallySetHeartlandPaymentMethod) {
	// 				/* bypass tokenization/sale */
	// 				return true;
	// 			}

	// 			currentRecord.setValue({
	// 				fieldId: 'paymentmethod',
	// 				value: settings.heartlandPaymentMethodId
	// 			});
	// 		}

	// 		// set the payment operation after payment method is finalized
	// 		setDefaultPaymentOperation(currentRecord, true);

	// 		var paymentOperationText = currentRecord.getText({
	// 			fieldId: app.config.transaction.body.paymentOperation
	// 		});

	// 		var heartlandccData = buildHeartlandTokenRequest(currentRecord);

	// 		/* mask the card number */
	// 		var maskedCardNumber = maskCardNumber(heartlandccData.number);

	// 		/* card was not tokenized */
	// 		if (!maskedCardNumber) {
	// 			return true;
	// 		}

	// 		/* if token is already present, do not attempt to update it */
	// 		// if (heartlandccData.token) {
	// 		// 	var userResponse = confirm( "Process " + paymentOperationText + " operation on existing card " + maskedCardNumber+"?" );

	// 		// 	if (!userResponse) {
	// 		// 		return false;
	// 		// 	}
	// 		// 	return true;
	// 		// }

	// 		/* confirm with the user that the card is about to be authorized for the given amount */
	// 		if (!confirm( "Process " + paymentOperationText + " on " + heartlandccData.cardHolderName + " " + cardType + " card " + heartlandccData.number + "?" )) {
	// 			return false;
	// 		}

	// 		/* If the Do not store checkbox is marked, mark the token record as such */
	// 		if (doNotStoreCard) {

	// 			heartlandccData.oneTimeUse = true;

	// 			// create/update the token record 
	// 	        response.ccId = utils.addToken(heartlandccData);

	// 			return true;
	// 		}

	// 		/* Send a request to Heartland to tokenize the single use token, firing the callback on success */
	// 		return app.hlapi.routeMultiUseTokenRequest(heartlandccData, function callback(tokenResponse) {
				
	// 			var response = validateClientResponse(tokenResponse);
				
	// 			if (!response) {
	// 				Promise.reject(response);
	// 				return false;
	// 			}

	// 			heartlandccData.token = response.token;

	// 			/* create/update the token record */
	// 	        response.ccId = utils.addToken(heartlandccData);

	// 	        updateHeartlandBodyFields(currentRecord, response);
	// 	        Promise.resolve(tokenResponse);
	// 			return true;
	// 		});

	// 	} catch(e) {
	// 		window.console && console.error(JSON.stringify(e), e);
	// 		throw app.handleError(e);
	// 	}
	// 	return false;
	// };

	/* given the current record and the API response, update the response fields */
  //   updateHeartlandBodyFields = function updateHeartlandBodyFields(recordObject, response) {

  //   	var options = {
		// 	fieldId: app.config.transaction.body.ccToken,
		// 	value: response.token
		// };
    	
		// /* set the token and response info on the current transaction */
		// recordObject.setValue(options);
		// recordObject.setValue({
		// 	fieldId: app.config.transaction.body.creditCardId,
		// 	value: response.ccId
		// });

		// /* Due a UI issue, this field will not be set for a new CC, user event handles that 
		//  @note this also serves to force wipe the actual card data before submit via botched sourcing */
		// recordObject.setValue({
		// 	fieldId: app.config.transaction.body.creditCards,
		// 	value: response.ccId
		// });
  //   };

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
	      	console.log(currentRecordObject);
	      	console.log(app.config.record.tokens.field.customer);
	      	console.log(app.config.record.tokens.field.cardtype);
	      	console.log(app.config.record.tokens.field.token);
	      	console.log(app.config.record.tokens.field.ccname);
	      	console.log(app.config.record.tokens.field.lastname);

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

	/** 
	 * Function triggered when a field value changes.
	 *
	 * @param {Object} scriptContext
	 * @param {N/record.Record} scriptContext.currentRecord
	 */
	// fieldChanged = function fieldChanged(scriptContext) {

	// 	try {

	// 		var currentRecord = scriptContext.currentRecord;
	// 		var fieldId = scriptContext.fieldId;
	// 		var fieldValue = currentRecord.getValue({fieldId: fieldId});
	// 		var paymentMethod = currentRecord.getValue({fieldId: 'paymentmethod'});

	// 		/* Toggle address fields displaytype regardless of fieldValue */
	// 		if (fieldId == app.config.transaction.body.address.processAvs) {
	// 			toggleAddressFields(currentRecord, fieldValue);
	// 		}

	// 		/* Always allow fields to be cleared */
	// 		if (!fieldValue || !fieldId) {
	// 			return true;
	// 		}

	// 		/* Remove spaces from credit card number */
	// 		if (fieldId == app.config.transaction.body.creditCardNumber) {
	// 			currentRecord.setValue({
	// 				fieldId: app.config.transaction.body.creditCardNumber,
	// 				value: fieldValue.replace(/\s/g, ''),
	// 				ignoreFieldChange: true
	// 			});
	// 			return true;
	// 		}

	// 		/* when the cctoken is populated disable the stored checkbox */
	// 		else if (fieldId == app.config.transaction.body.ccToken) {
	// 			var fieldObject = currentRecord.getField({fieldId: app.config.transaction.body.doNotStoreCard});
	// 			fieldObject.isDisabled = !!fieldValue;
	// 		}

	// 		/* When the customer field is set, check if it should default the Heartland payment method */
	// 		else if (fieldId == 'entity') {

	// 			if (settings.autoSetHeartlandDefaultPayment) {
	// 				setDefaultPaymentOperation(currentRecord);
	// 				return true;
	// 			}

	// 			var lookupFields = search.lookupFields({
	// 				type: search.Type.CUSTOMER,
	// 				id: fieldValue,
	// 				columns: [app.config.entity.defaultCard]
	// 			});

	// 			var fieldOptions = {
	// 				fieldId: app.config.transaction.body.creditCards,
	// 				value: lookupFields[app.config.entity.defaultCard][0].value
	// 			};

	// 			/* Delay setting the CC, because NetSuite is attempting to source in the default CC data */
	// 			setTimeout(function(){currentRecord.setValue(fieldOptions);}, 1500);
	// 		}

	// 		/* Clear the Heartland CC selector when payment method changes to something other than Heartland */
	// 		else if (fieldId == 'paymentmethod') {

	// 			if (!pageInitialized) {
	// 				return true;
	// 			}

	// 			var currentPaymentMethod = currentRecord.getValue({fieldId: 'paymentmethod'});

	// 			if (currentPaymentMethod && currentPaymentMethod != settings.heartlandPaymentMethodId) {

	// 				return clearHeartlandFields(currentRecord);
	// 			}
	// 		}

	// 		/* If a change happens in Heartland CC field, make sure the Heartland payment method is set */
	// 		else if (fieldId == app.config.transaction.body.creditCardNumber) {

	// 			if (paymentMethod != settings.heartlandPaymentMethodId) {
	// 				if (confirm(app.config.language.paymentMethodIsNotHeartland)) {

	// 					currentRecord.setValue({fieldId: 'paymentmethod', value: settings.heartlandPaymentMethodId});
	// 					return true;
	// 				} else {
	// 					return false;
	// 				}
	// 			}
	// 			return true;
	// 		}

	// 		/* Handle field driven field reset */
	// 		else if (fieldId == app.config.transaction.body.reset) {

	// 			var returnValue = clearHeartlandFields(currentRecord);

	// 			currentRecord.setValue({
	// 				fieldId: app.config.transaction.body.reset,
	// 				value: false,
	// 				ignoreFieldChange: true
	// 			});

	// 			return returnValue;
	// 		}
	// 	} catch(e) {
	// 		window.console && console.error(JSON.stringify(e), e);
	// 		throw app.handleError(e);
	// 	}
		
	// 	return true;
	// };

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
		// fieldChanged: fieldChanged
	};
});