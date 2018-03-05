/*

Title : Check Required And Conditional Documents
Purpose : TO Check Required And Conditional Documents
Author: Haetham Eleisah
Functional Area : ACA,AV Events
Description : JSON Example : 

{
	"Building/Commercial/New Construction/NA": {
		"Pageflow": [{
			"preScript":" ",
			"customLists": {										
				"CUSTOM LIST/Item Numer": "12345",
				"CUSTOM LIST/Item Description": "haetham",
			},
			"contactFields": {
				"contactType": "Applicant"

			},

			"lpFields": {											
				"licType": "Engineer",								

			},
			"customFields" : {
				"Job Value": "2000",
				"Code": "KBC 2012"
			} ,
			"addressFields": {										
				"zip": "12345",										

			},
			"parcelFields": {
				"ParcelNumber": "00800"
			},

			"requiredDocuments" :"Letters|Plans",
			"requirementType" :"STANDARD",
			"postScript ": " "
		} 
		],
		"ApplicationSpecificInfoUpdateBefore":[{
			"preScript":" ",
			"customLists": {										
				"CUSTOM LIST/Item Numer": "12345",
				"CUSTOM LIST/Item Description": "haetham",
			},
			"contactFields": {
				"contactType": "Applicant"

			},

			"lpFields": {											
				"licType": "Engineer",								

			},
			"customFields" : {
				"Job Value": "100",
				"Code": "KBC 2012"
			} ,
			"addressFields": {										
				"zip": "12345",										

			},
			"parcelFields": {
				"ParcelNumber": "00800"
			},

			"requiredDocuments" :"Letters|Plans",
			"requirementType" :"STANDARD",
			"postScript ": " "
		} 

		],
		"LicProfUpdateBefore": [{
			"preScript":" ",
			"contactFields": {
				"Contact Type": "Applicant",
				"firstName": "testeee"
			},


			"requiredDocuments" :"Letters|Plans|Pictures",
			"requirementType" :"CONDITIONAL",
			"postScript ": " "
		}
		],
		"WorkflowTaskUpdateBefore/Application Submittal/Additional Information Required": [{
			"preScript": "",
			"contactFields": {
				"Contact Type": "Applicant",
				"Custom Field": "Value"
			},
			" customFields": {
				"Custom Field 1": "Value 1",
				"Custom Field 2": "Value 2"
			},
			"addressFields": {
				"Zip Code": "12345",
				"Custom Field": "Value"
			},
			"parcelFields": {
				"Zone": "Historic"
			},
			" lpFields": {
				"Professional Type": "Engineer",
				"Custom Field": "Value"
			},
			"requiredDocuments": "Document1|Document2",
			"requirementType": "CONDITIONAL or STANDARD",
			"postScript": ""
		}
		]
	}
}

Available Types: contactFields, customFields, customLists, parcelFields, addressFields, lpFields

Available Attributes for each type: 
- Custom Fields and Custom Lists: ALL
- Address: All Custom Attributes, (primaryFlag,houseNumberStart,streetDirection,streetName,streetSuffix,city,state,zip,addressStatus,county,country,addressDescription,xCoordinate,yCoordinate)
- Parcel: All Custom Attributes, (ParcelNumber,Section,Block,LegalDesc,GisSeqNo,SourceSeqNumber,Page,I18NSubdivision,CouncilDistrict,RefAddressTypes,ParcelStatus,ExemptValue,PublicSourceSeqNBR,CensusTract,InspectionDistrict,NoticeConditions,ImprovedValue,PlanArea,Lot,ParcelArea,Township,LandValue)
- Licensed Professional: All Custom Attributes, (licType,lastName,firstName,businessName,address1,city,state,zip,country,email,phone1,phone2,lastRenewalDate,licExpirationDate,FEIN,gender,birthDate)
- Contact: All Custom Attributes, (firstName,lastName,middleName,businessName,contactSeqNumber,contactType,relation,phone1,phone2,email,addressLine1,addressLine2,city,state,zip,fax,notes,country,fullName,peopleModel)
 */

try {
	eval(getScriptText("CONFIGURABLE_SCRIPTS_COMMON"));
	var settingsArray = [];
	isConfigurableScript(settingsArray, "REQUIRED_DOCUMENTS");
	var requiredDocuments;
	var requirementType;
	for (s in settingsArray) {
		var rules = settingsArray[s];
		var preScript = rules.preScript;
		var postScript = rules.postScript;
		requiredDocuments = rules.requiredDocuments;
		requirementType = rules.requirementType;
		/// check if the rules on conditional and the user in AV
		if (requirementType == "CONDITIONAL" && !isPublicUser)
			break;

		// run preScript
		if (!matches(preScript, null, " ")) {
			eval(getScriptText(preScript, null, false));
		}
		// this to clear the required document if the rule was not passed
		if (requirementType == "CONDITIONAL") {
			removeAllRequiredDocumentCapCondition();
		}
		/// this to check if all Rules  if is matched.
		if (isJsonRulesMatchRecordData(rules))
			ValidateDocument();
	}

} catch (ex) {

	logDebug("**ERROR:Exception while verificaiton the rules  " + ex);
}

/// this function will validate documents based on the rules in the JSON.
function ValidateDocument() {
	// this when rules is matched;

	var submittedDocArray = aa.document.getCapDocumentList(capId, currUserId).getOutput();
	if (submittedDocArray == null || submittedDocArray.length == 0) {
		submittedDocArray = aa.document.getDocumentListByEntity(capId, "TMP_CAP").getOutput().toArray();
	}

	var DocumentString = "";
	var DocumentsArray = requiredDocuments.split('|');
	var documentExists = false;

	if (requirementType == "CONDITIONAL" && isPublicUser) {
		for ( var d in DocumentsArray) {
			addConditionMultiLanguage(DocumentsArray[d], DocumentsArray[d]);
		}
		documentExists = true;
	} else if (requirementType == "STANDARD") {
		for ( var d in DocumentsArray) {
			DocumentString += DocumentsArray[d] + ",";
			for ( var i in submittedDocArray) {
				if (submittedDocArray[i].getDocCategory() == DocumentsArray[d]) {
					documentExists = true;
					break;

				} else {
					documentExists = false;

				}

			}

		}

	}
	if (!documentExists) {
		var msg = "The following documents are required to continue:" + DocumentString
		cancel = true;
		showMessage = true;
		if (isPublicUser) {
			aa.env.setValue("ErrorCode", "1");
			aa.env.setValue("ErrorMessage", msg);
			comment(msg);
		} else {

			comment(msg);
		}

	}
	if (!matches(postScript, null, " ")) {
		eval(getScriptText(postScript)); // , null, false ???
	}

}
