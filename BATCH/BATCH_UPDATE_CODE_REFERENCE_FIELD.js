/* Title :  Update Code Reference Field (Batch Job)

Purpose :   If criteria: If the user executes the batch job Action: Then update the custom field “Code Reference” using 2 batch
parameters with a find and replace functionality. The values will be provided by the user. Configure batch parameters
“Where Code Equals” and “Update Code To”. This will allow the users to update specific code references where applicable
on records. In addition the batch job needs to update the record status from “Approved” to “Unapproved”.

Record Type :Building/Permit/Master/NA

Author :   Israa Ismail

Functional Area : Records
 
Sample Call : updateCodeReferenceForBuildingPermitMasterRecords()

*/
var batchJobName = "" + aa.env.getValue("BatchJobName");	// Name of the batch job
var codeEquals = aa.env.getValue("Where Code Equals");
var updateCodeTo = aa.env.getValue("Update Code To");

var SCRIPT_VERSION = 3.0;
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS"));

function getScriptText(e) {
	var t = aa.getServiceProviderCode();
	if (arguments.length > 1)
		t = arguments[1];
	e = e.toUpperCase();
	var n = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		var r = n.getScriptByPK(t, e, "ADMIN");
		return r.getScriptText() + ""
	} catch (i) {
		return ""
	}
}

updateCodeReferenceForBuildingPermitMasterRecords();

function updateCodeReferenceForBuildingPermitMasterRecords(){
	if (codeEquals!=null && codeEquals!="" && updateCodeTo!=null && updateCodeTo!=""){
		var capListResult = aa.cap.getByAppType("Building","Permit","Master","NA");
		capList = capListResult.getOutput();
		for(xx in capList)
			{
			useAppSpecificGroupName=false;
			var codeRef=getAppSpecific("Code Reference",capList[xx].getCapID());
			if (codeRef!=codeEquals)continue;
			editAppSpecific("Code Reference",updateCodeTo,capList[xx].getCapID());
			if( capList[xx].getCapStatus() != "Approved" ) continue;
			updateAppStatus("Unapproved","Updated via Batch Job : " + batchJobName,capList[xx].getCapID());
			
			}
	}
}
