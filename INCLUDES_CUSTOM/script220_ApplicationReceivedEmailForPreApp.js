//Script 220
//Record Types:	ODA/Pre Application/NA/NA
//Event: 		ASA
//Desc:			When the record is submitted/created then generate 
//              Application Received email and send it to the contacts 
//              on the record. Aurora will provide the email template  
//
//Created By: Silver Lining Solutions

function script220_ApplicationReceivedEmailForPreApp() {
	logDebug("script220_ApplicationReceivedEmailForPreApp() started.");
	try{
		var iNameResult = aa.person.getUser(currentUserID);
		var iName = iNameResult.getOutput();
		var email=iName.getEmail();
		var emlTo=email;
		//var emlTo = "eric@esilverliningsolutions.com";
	logDebug("script220 currentUserID: " + currentUserID);
	logDebug("script220         email: " + email);
	logDebug("script220         emlTo: " + emlTo);
		var capID4Email = aa.cap.createCapIDScriptModel(capId.getID1(),capId.getID2(),capId.getID3());
		var emailParameters = aa.util.newHashtable();
		var reportFile = [];
		var sendResult = sendNotification("noreply@aurora.gov",emlTo,"","TEST_FOR_SCRIPTS",emailParameters,reportFile,capID4Email);
		if (!sendResult) { logDebug("script220: UNABLE TO SEND NOTICE!  ERROR: "+sendResult); }
		else { logDebug("script220: Sent email notification that work order is complete to "+emlTo)}
	}
	catch(err){
		showMessage = true;
		comment("Error on custom function script220_ApplicationReceivedEmailForPreApp(). Please contact administrator. Err: " + err);
		logDebug("Error on custom function script220_ApplicationReceivedEmailForPreApp(). Please contact administrator. Err: " + err);
	}
	logDebug("script220_ApplicationReceivedEmailForPreApp() ended.");
};//END script220_ApplicationReceivedEmailForPreApp