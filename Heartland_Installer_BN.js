/**
 *@NApiVersion 2.x
 *@NScriptType BundleInstallationScript
 */
define([
	'N/record',
	'N/search',
	'N/runtime'
], function (record, search, runtime) {

	var connection_settings = {
        type: 'customrecord_heartl_settings',
        fields: getConnectionFieldsAndDefaults()
    };

	function checkPrerequisites() {
		var requireFeatures = [
			'ACCOUNTING',
			'ACCOUNTINGPERIODS',
			// 'ALTERNATIVEPAYMENTS',
			'CRM',
			'DOCUMENTS',
			'SERVERSIDESCRIPTING'
		];

		requireFeatures.forEach(function(feature) {
	        if (!runtime.isFeatureInEffect({
                feature: feature
            }))
            throw 'The ' + feature + ' feature must be enabled. ' +
                'Please enable the feature and try again.';

		});
    }

	function getHeartlandPaymentMethod() {

		var results = search.create({
			type: search.Type.PAYMENT_METHOD,
			columns: [],
			filters: [
				['name', search.Operator.IS, 'Heartland'],
				'OR',
				['name', search.Operator.IS, 'heartland'],
				'OR',
				['name', search.Operator.IS, 'HEARTLAND'],
			]
		}).run().getRange({start: 0, end: 1});

		if (!results) {
			return null;
		}

		return results[0].id;
	}

	function beforeInstall(context) {

		checkPrerequisites();

		var heartlandPaymentMethodExists = getHeartlandPaymentMethod;

		if (!heartlandPaymentMethodExists) {
			throw 'A payment method with the name "Heartland" must be created before install';
		}

	}

	function afterInstall(context) {

		var settingsExist = search.create({type: connection_settings.type}).run().getRange({start: 0, end: 1});

		if (settingsExist) {
			return;
		}

		var heartlandSettings = record.create({
			type: connection_settings.type
		});

		for (var field in connection_settings.fields) {
    		heartlandSettings.setValue({
    			fieldId: field.fieldId, 
    			value: field.defaultValue
    		});
        }

		heartlandSettings.save();
	}

    function getConnectionFieldsAndDefaults() {
        return {
    
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
    }

	return {
		beforeInstall: beforeInstall,
		afterInstall: afterInstall
	};
});