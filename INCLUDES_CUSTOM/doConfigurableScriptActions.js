/*
 This replaces the loop through the two standard choices - STANDARD_SOLUTIONS and CONFIGURABLE_RULESETS
 Approach is that there will be 1 JSON script per solution/module
 The naming convention is CONFIGURABLE_RULESET_[solution/module name], for instance CONFIGURABLE_RULESET_LICENSES
 The JSON will include the scripts to be called by event for that solution/module, as an array
 This function will be located in the INCLUDES_ACCELA_FUNCTIONS and called at the end of the INCLUDES_CUSTOM, 
  until it can be incorporated into Master Scripts
 Sample JSON:
 {
  "WorkflowTaskUpdateAfter": {
    "StandardScripts": [
      "STDBASE_RECORD_AUTOMATION",
      "STDBASE_INSPECTION_SCHEDULING",
      "STDBASE_SEND_CONTACT_EMAILS"
    ]
  },
  "ApplicationSubmitBefore": {
    "StandardScripts": [
      "STDBASE_RECORD_VALIDATION",
      "STDBASE_ADDRESS_VALIDATION",
      "STDBASE_PARCEL_VALIDATION"
    ]
  },
  "ApplicationSubmitAfter": {
    "StandardScripts": [
      "STDBASE_RECORD_AUTOMATION",
      "STDBASE_SEND_CONTACT_EMAILS"
    ]
  }
}
 */
 
function doConfigurableScriptActions(){
	eval(getScriptText("INCLUDES_RECORD"));
	
	 // is there a JSON file for this solution/module
	var thisRecord = new Record(capId);
	var thisRecordType = thisRecord.getCapType();
	var thisRecordTypeString = thisRecordType.toString();
	
	var capTypeArr = new Array();
	var capTypeArr = thisRecordTypeString.split("/");
	var module = capTypeArr[0];
	
	rulesetName = "CONFIGURABLE_RULESET_" + module;
	rulesetName = rulesetName.toUpperCase();
	logDebug("rulesetName: " + rulesetName);
	
	 var configRuleset = getScriptText(rulesetName);
	 if (configRuleset == ""){
		 logDebug("No JSON file exists for this module.");
	 }else{
		var configJSON = JSON.parse(configRuleset);
	 
	
	// match event, run appropriate configurable scripts
		settingsArray = [];
		if(configJSON[controlString]) {
			var ruleSetArray = configJSON[controlString];
			var scriptsToRun = ruleSetArray.StandardScripts;
			
			for (s in scriptsToRun){
				logDebug("doConfigurableScriptActions scriptsToRun[s]: " + scriptsToRun[s]);
				var script = scriptsToRun[s];
				var validScript = getScriptText(script);
				if (validScript == ""){
					logDebug("Configurable script " + script + " does not exist.");
				}else{
					eval(getScriptText(scriptsToRun[s]));
				}
			}
		}
	}
 }