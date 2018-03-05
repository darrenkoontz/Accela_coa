/*==========================================================================================
Title : STDBASE_SEND_CONTACT_EMAILS

Purpose : Sends Email Template to necessary Contact Types with available parameters

Author: David Bischof / Jason Plaisted

Functional Area : General

Description : JSON must contain :
				"Module/Type/Subtype/Category" = 4 level record structure parent
					"Rule set" - SubParent.  Event name plus rules.  Currently supports only wftTask/wfStatus or inspType/inspResult. example: "WorflowTaskUpdateAfter/wfTask/wfStatus" 
						"notificationTemplate" = name of email template to be used
						"notificationReport" = name of reports to be sent with notification, pipe | delimited
						"notifyContactTypes" = contact types to be sent the notification, pipe | delimited. May include "ALL" and "Primary" but as the only parameter
						"url4ACA" = include the URL for ACA	
						"fromEmail" = who to send from (must have proper permissions)
						"additionalEmailsTo" = /optional/ additional Email Recipients, pipe | delimited email addresses
							Sample: "additionalEmailsTo":"email1@host.com|email2@host.com"
						"customFields"= /optional/ key-value pairs, (asiFieldName,asiRequiredValue) allows multiple (matched with AND)
							Sample: "customFields":{"asiField1":"asiVal1","asiField2":"asiVal2"}
						"createFromParent" = /optional/ (true/false) creates the notification from the parent License Record for example
						"reportingInfoStandards" = /optional/ Defualts to "Reporting Information Standards" Standard Choice for varibles such as Agency Name

                For testing, a sample JSON object is embedded in the function.  Wild cards are accepted in all 4 levels.
				
				Included Report Params are:
				altID
				inspID (inspection events only)
				
				Included email Parameters are:
				Contacts:
				$$ContactLastName$$
				$$ContactFirstName$$
				$$ContactMiddleName$$
				$$ContactFullName$$
				$$ContactBusinesName$$
				$$ContactContactSeqNumber$$
				$$ContactType$$
				$$ContactRelation$$
				$$ContactPhone1$$
				$$ContactPhone2$$
				$$ContactEmail$$
				$$ContactAddressLine1$$
				$$ContactAddressLine2$$
				$$ContactCity$$
				$$ContactState$$
				$$ContactZip$$
				$$ContactFax$$
				$$ContactNotes$$
				$$ContactCountry$$

				
				Record:
				$$altID$$
				$$recordAlias$$
				$$recordStatus$$
				$$balance$$
				$$fileDate$$
				$$workDesc$$
				$$acaRecordUrl$$
				$$acaPaymentUrl$$
				
				Inspection:
				$$inspId$$  (inspection events only)
				$$inspResult$$   (inspection events only)
				$$inspComment$$   (inspection events only)
				$$inspResultDate$$   (inspection events only)
				$$inspGroup$$   (inspection events only)
				$$inspType$$    (inspection events only)
				$$inspSchedDate$$    (inspection events only)
				
				Workflow:
				$$wfTask$$    (workflow events only)
				$$wfStatus$$    (workflow events only)
				$$wfDate$$    (workflow events only)
				$$wfComment$$    (workflow events only)
				$$wfStaffUserID$$    (workflow events only)
				$$wfHours$$    (workflow events only)
Reviewed By: 

Script Type : (EMSE, EB, Pageflow, Batch): EMSE

General Purpose/Client Specific : General

Client developed for : 

Parameters:
				parameters - pass in aa.util.newHashtable(); for additional parameters. 
							(example: myNewParams = aa.util.hashTable(); 
									  addParameter(myNewParams, $$expirationDate$$, expirationDate);
									  send to function:	 sendContactEmails(myNewParams);
							 or, pass "null" if none: 	 sendContactEmails(null);
				itemCap - optional capId
================================================================================================================*/
var scriptSuffix = "SEND_CONTACT_EMAILS";
// CONF_{SOLUTION}_SEND_CONTACT_EMAILS
// {SOLUTION} = AS DEFINED IN THE "SOLUTION MAPPING" STANDARD CHOICE

var agencyReplyEmailDefault = lookup("ACA_EMAIL_TO_AND_FROM_SETTING", "RENEW_LICENSE_AUTO_ISSUANCE_MAILFROM");
var acaURLDefault = lookup("ACA_CONFIGS", "ACA_SITE");
acaURLDefault = acaURLDefault.substr(0, acaURLDefault.toUpperCase().indexOf("/ADMIN"));
acaURLDefault = "https://acastd.accela.com/marijuanalicensing";

try {
	// This should be included in all Configurable Scripts
	eval(getScriptText("CONFIGURABLE_SCRIPTS_COMMON"));
	var settingsArray = [];
	if (isConfigurableScript(settingsArray, scriptSuffix)) {

		for (s in settingsArray) {

			var rules = settingsArray[s];

			//Execute PreScript
			var preScript = rules.preScript;
			if (!matches(preScript, null, "")) {
				eval(getScriptText(preScript));
			}

			var asiMatched = true;
			if (typeof rules.customFields !== 'undefined' && rules.customFields != "" && rules.customFields != null) {

				//in AInfo we don't know if useAppSpecificGroupName was true or false,
				//we don't have asi group/subgroup name, so we reload with useAppSpecificGroupName=false
				var olduseAppSpecificGroupName = useAppSpecificGroupName;
				useAppSpecificGroupName = false;
				var asiValues = new Array();
				loadAppSpecific(asiValues);
				useAppSpecificGroupName = olduseAppSpecificGroupName;

				for (r in rules.customFields) {
					asiMatched = asiMatched && asiValues[r] == rules.customFields[r];
				}
			}

			if (asiMatched) {
				//Execute
				sendContactEmails(capId, rules);
			}

			//Execute Post Script
			var postScript = rules.postScript;
			if (!matches(postScript, null, "")) {
				eval(getScriptText(postScript));
			}
		}
	}

} catch (ex) {
	logDebug("**ERROR: Exception while verification the rules for " + scriptSuffix + ". Error: " + ex);
}

function runReportAndSendAsync(reportName, module, itemCapId, reportParameters, emailFrom, emailTo, emailTemplate, emailParameters, emailCC, waitTimeSec, reportAttach) {

	var scriptName = "STDBASE_RUNREPORTANDSENDASYNC";
	var errorEmailTo = "";
	var debugEmailTo = errorEmailTo;
	var vReportAttach = matches(reportAttach, "false", false) ? false : true;
	var systemEmailFrom = agencyReplyEmailDefault;
	var waitTime = 2000;
	if (!matches(waitTimeSec, null, ""))
		waitTime = parseInt(parseInt(waitTimeSec) * 1000);

	var envParameters = aa.util.newHashMap();
	envParameters.put("ReportName", reportName);
	envParameters.put("ReportParameters", reportParameters);
	envParameters.put("ReportAttach", vReportAttach);
	envParameters.put("Module", module);
	envParameters.put("CustomCapId", itemCapId.getCustomID());
	envParameters.put("CapID", itemCapId);
	envParameters.put("ReportUser", currentUserID);
	envParameters.put("ServProvCode", servProvCode);
	envParameters.put("EmailFrom", emailFrom);
	envParameters.put("EmailTo", emailTo);
	envParameters.put("EmailCC", emailCC);
	envParameters.put("EmailTemplate", emailTemplate);
	envParameters.put("EmailParameters", emailParameters);
	envParameters.put("SystemMailFrom", systemEmailFrom);
	envParameters.put("ErrorEmailTo", errorEmailTo);
	envParameters.put("DebugEmailTo", debugEmailTo);
	envParameters.put("WaitTime", waitTime);

	aa.runAsyncScript(scriptName, envParameters);
	logDebug("(runReportAndSendAsync) Calling runAsyncScript for " + reportName);
}

function getStandardChoiceArray(stdChoice) {
	var cntItems = 0;
	var stdChoiceArray = new Array();
	var bizDomScriptResult = aa.bizDomain.getBizDomain(stdChoice);
	if (bizDomScriptResult.getSuccess()) {
		var bizDomScriptObj = bizDomScriptResult.getOutput();
		cntItems = bizDomScriptObj.size();
		logDebug("getStdChoiceArray: size = " + cntItems);
		if (cntItems > 0) {
			var bizDomScriptItr = bizDomScriptObj.iterator();
			while (bizDomScriptItr.hasNext()) {
				var bizBomScriptItem = bizDomScriptItr.next();
				var stdChoiceArrayItem = new Array();
				stdChoiceArrayItem["value"] = bizBomScriptItem.getBizdomainValue();
				stdChoiceArrayItem["valueDesc"] = bizBomScriptItem.getDescription();
				stdChoiceArrayItem["active"] = bizBomScriptItem.getAuditStatus();
				stdChoiceArray.push(stdChoiceArrayItem);
			}
		}
	}
	return stdChoiceArray;
}

function getReporingInfoStandards4Notification(eParamsHash, rptInfoStdChoice) {

	var rptInfoStdArray = getStandardChoiceArray(rptInfoStdChoice);

	for (iSC in rptInfoStdArray) {
		if (rptInfoStdArray[iSC]["active"] == "A") {
			var scValue = String(rptInfoStdArray[iSC]["value"]);
			var scValueDesc = (rptInfoStdArray[iSC]["valueDesc"] != null) ? String(rptInfoStdArray[iSC]["valueDesc"]) : "";
			var parameterName = "";

			if (scValue.indexOf("$$") < 0)
				parameterName = "$$" + scValue.replace(/\s+/g, '') + "$$";
			else
				parameterName = scValue;

			addParameter(eParamsHash, parameterName, scValueDesc);
		}
	}

	return eParamsHash;
}

/**
 * Standard base automation to send notifications to contacts based on JSON configurable rules.
 * 
 * @param {CapIdObject} itemCapId CapIdObject blah
 * @param {JSON} recordSettings JSON configuration ruleset
 * @param {HashMap} parameters Optional hashmap of notification template parameters
 */
function sendContactEmails(itemCapId, recordSettings, parameters) {

	var functionTitle = "sendContactEmails()";

	var debugMode = false;

	// validate JSON parameters using handleUndefined function
	// handleUndefine(JSON Parameter, isRequired);
	var rNotificationTemplate = handleUndefined(recordSettings.notificationTemplate, false);
	var rNotifyContactType = handleUndefined(recordSettings.notifyContactTypes, false);
	var rUrl4ACA = handleUndefined(recordSettings.url4ACA, false);
	var rNotificationReport = handleUndefined(recordSettings.notificationReport, false);
	var rFromEmail = handleUndefined(recordSettings.fromEmail, false);
	var rAdditionalEmailsTo = handleUndefined(recordSettings.additionalEmailsTo, false);
	var rCreateFromParent = handleUndefined(recordSettings.createFromParent, false);
	var rReportingInfoStandards = handleUndefined(recordSettings.reportingInfoStandards, false);

	// VALIDATE FUNCTION PARAMETERS
	// validate required parameters, log error and return false if required parameters are missing
	if (!rNotificationTemplate) {
		logDebug("ERROR: recordSettings.notificationTemplate is missing in JSON configuration.");
		return false;
	}

	if (!rNotifyContactType) {
		logDebug("ERROR: recordSettings.notifyContactType is missing in JSON configuration.");
		return false;
	}

	if (!rUrl4ACA || rUrl4ACA == "") {
		rUrl4ACA = acaURLDefault;
	}

	/*	if (!rNotificationReport) {
			logDebug("ERROR: recordSettings.notificationReport is missing in JSON configuration.");
			return false;
		} */

	if (!rFromEmail || rFromEmail == "") {
		rFromEmail = agencyReplyEmailDefault;
	}

	if (typeof itemCapId == 'undefined') {
		logDebug("WARNING: The capIdObject Parameter is required for the function. " + functionTitle);
		return false;
	}
	if (!rCreateFromParent || rCreateFromParent == "") {
		rCreateFromParent = false;
	}

	if (rCreateFromParent) {
		var vParentCapId = getParentByCapId(itemCapId);

		if (vParentCapId) {
			itemCapId = vParentCapId;
		}
	}

	if (!rReportingInfoStandards || rReportingInfoStandards == "") {
		rReportingInfoStandards = "Reporting Information Standards";
	}

	if (rNotificationTemplate != "" && rNotifyContactType != "") {
		try {
			//Get Contacts
			emailAddrList = new Array();
			contactObjArray = new Array();
			capContactArray = null;
			var capContactResult = aa.people.getCapContactByCapID(itemCapId);
			if (capContactResult.getSuccess()) {
				var capContactArray = capContactResult.getOutput();
			}

			//Check Necessary Contacts
			if (rNotifyContactType.toUpperCase() != "ALL" && rNotifyContactType.toUpperCase() != "PRIMARY") {
				conTypeArray = rNotifyContactType.split('|');
				if (capContactArray) {
					for (y in capContactArray) {
						thisCon = capContactArray[y];
						for (z in conTypeArray) {
							if (thisCon.getPeople().getContactType().toUpperCase() == conTypeArray[z].toUpperCase()) {
								if (thisCon.getEmail())
									contactObjArray.push(new contactObj(thisCon));
							}
						}
					}
				}
			} else if (rNotifyContactType.toUpperCase() == "ALL") {
				if (capContactArray) {
					for (y in capContactArray) {
						thisCon = capContactArray[y];
						if (thisCon.getEmail())
							contactObjArray.push(new contactObj(thisCon));
					}
				}
			} else if (rNotifyContactType.toUpperCase() == "PRIMARY") {
				if (capContactArray) {
					for (y in capContactArray) {
						thisCon = capContactArray[y];
						if (thisCon.getPeople().getFlag() == "Y" && thisCon.getEmail())
							contactObjArray.push(new contactObj(thisCon));
						;
					}
				}
			}

			var eParams = null;
			if (contactObjArray.length > 0 || rAdditionalEmailsTo) {

				//Build parameters
				if (!parameters) {
					eParams = aa.util.newHashtable();
				} else {
					eParams = parameters;
				}
				responsiveACA = lookup("ACA_CONFIGS", "ENABLE_CUSTOMIZATION_PER_PAGE");
				var itemCapIDString = itemCapId.getCustomID();
				var itemCap = aa.cap.getCap(itemCapId).getOutput();
				var itemCapName = itemCap.getSpecialText();
				var itemCapStatus = itemCap.getCapStatus();
				var itemFileDate = itemCap.getFileDate();
				var itemCapTypeAlias = itemCap.getCapType().getAlias();
				var itemAppTypeResult = itemCap.getCapType();
				var itemAppTypeString = itemAppTypeResult.toString();
				var itemAppTypeArray = itemAppTypeString.split("/");
				var itemModule = itemCap.getCapModel().getModuleName();
				var itemHouseCount;
				var itemFeesInvoicedTotal;
				var itemBalanceDue = 0;

				var itemCapDetailObjResult = aa.cap.getCapDetail(itemCapId);
				if (itemCapDetailObjResult.getSuccess()) {
					itemCapDetail = itemCapDetailObjResult.getOutput();
					itemHouseCount = itemCapDetail.getHouseCount();
					itemFeesInvoicedTotal = itemCapDetail.getTotalFee();
					itemBalanceDue = itemCapDetail.getBalance();
				}

				var workDesc = workDescGet(itemCapId);

				//Report Parameters
				var repParams = aa.util.newHashMap();
				//repParams.put("altID", itemCapId.getCustomID());
				repParams.put("p1Value", itemCapIDString); // Used for Ad Hoc Reporting

				getReporingInfoStandards4Notification(eParams, rReportingInfoStandards);

				addParameter(eParams, "$$altID$$", itemCapIDString);
				addParameter(eParams, "$$recordName$$", itemCapName);
				addParameter(eParams, "$$recordAlias$$", itemCapTypeAlias);
				addParameter(eParams, "$$recordStatus$$", itemCapStatus);
				addParameter(eParams, "$$fileDate$$", itemFileDate);
				addParameter(eParams, "$$balanceDue$$", "$" + parseFloat(itemBalanceDue).toFixed(2));
				addParameter(eParams, "$$workDesc$$", (workDesc) ? workDesc : "");

				if (rUrl4ACA && responsiveACA.toUpperCase() != "YES") {
					buildRecURL = rUrl4ACA + getACAUrl(itemCapId);
					buildPayURL = buildRecURL.replace("1000", "1009");
					addParameter(eParams, "$$acaRecordUrl$$", buildRecURL);
					addParameter(eParams, "$$acaPaymentUrl$$", buildPayURL);
				}
				if (rUrl4ACA && responsiveACA.toUpperCase() == "YES") {
					buildRecURL = rUrl4ACA + getACAUrl(itemCapId) + "&FromACA=Y";
					buildPayURL = buildRecURL.replace("1000", "1009");
					addParameter(eParams, "$$acaRecordUrl$$", buildRecURL);
					addParameter(eParams, "$$acaPaymentUrl$$", buildPayURL);
				}

				if (controlString.indexOf("Inspection") > -1) {
					if (inspId) {
						addParameter(eParams, "$$inspId$$", inspId);
						repParams.put("inspId", inspId);
					}
					if (inspResult)
						addParameter(eParams, "$$inspResult$$", inspResult);
					if (inspComment)
						addParameter(eParams, "$$inspComment$$", inspComment);
					if (inspResultDate)
						addParameter(eParams, "$$inspResultDate$$", inspResultDate);
					if (inspGroup)
						addParameter(eParams, "$$inspGroup$$", inspGroup);
					if (inspType)
						addParameter(eParams, "$$inspType$$", inspType);
					if (inspSchedDate)
						addParameter(eParams, "$$inspSchedDate$$", inspSchedDate);
				}
				if (controlString.indexOf("Workflow") > -1) {
					if (wfTask)
						addParameter(eParams, "$$wfTask$$", wfTask);
					if (wfStatus)
						addParameter(eParams, "$$wfStatus$$", wfStatus);
					if (wfDateMMDDYYYY)
						addParameter(eParams, "$$wfDate$$", wfDateMMDDYYYY);
					if (wfComment)
						addParameter(eParams, "$$wfComment$$", wfComment);
					if (wfActionByUserID)
						addParameter(eParams, "$$wfStaffUserID$$", wfStaffUserID);
					if (wfHours)
						addParameter(eParams, "$$wfHours$$", wfHours);
				}
			}//contacs list or additional emails

			//Send Email logic
			for (iCont in contactObjArray) {
				var eParamsContact = eParams;
				var rptParamsContact = repParams;
				var tContactObj = contactObjArray[iCont];
				tContactObj.getEmailTemplateParams(eParamsContact, "Contact");
				rptParamsContact.put("p2Value", tContactObj.type);

				if (rNotificationReport == "") {
					sendNotification(rFromEmail, tContactObj.people.getEmail(), "", rNotificationTemplate, eParamsContact, null, itemCapId);
				} else {
					reportFiles = new Array();
					repTypeArray = rNotificationReport.split('|');
					var capIDScriptModel = aa.cap.createCapIDScriptModel(itemCapId.getID1(), itemCapId.getID2(), itemCapId.getID3());
					for (xReport in repTypeArray) {
						var report = repTypeArray[xReport];
						runReportAndSendAsync(report, itemModule, itemCapId, rptParamsContact, rFromEmail, tContactObj.people.getEmail(), rNotificationTemplate, eParamsContact,
								"", 1);
					}
				}
			} // contactObjArray loop

			//code block repeated, we could not create empty CapContactScriptModel object and push() it to 'contactObjArray'
			if (rAdditionalEmailsTo) {
				var extraEmailsArray = rAdditionalEmailsTo.split("|");
				for (e in extraEmailsArray) {
					if (rNotificationReport == "") {
						sendNotification(rFromEmail, extraEmailsArray[e].trim(), "", rNotificationTemplate, eParams, null);
					} else {
						reportFiles = new Array();
						repTypeArray = rNotificationReport.split('|');
						var capIDScriptModel = aa.cap.createCapIDScriptModel(itemCapId.getID1(), itemCapId.getID2(), itemCapId.getID3());
						for (xReport in repTypeArray) {
							var report = repTypeArray[xReport];
							runReportAndSendAsync(report, itemModule, itemCapId, repParams, rFromEmail, extraEmailsArray[e].trim(), rNotificationTemplate, eParams, "", 1);
						}
					}
				}//for all extra emails
			}//rAdditionalEmailsTo

		} catch (err) {
			logDebug("Exception generating emails : " + err);
		}
	}
}
