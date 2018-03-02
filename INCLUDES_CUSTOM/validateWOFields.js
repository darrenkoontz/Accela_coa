function validateWOFields() {
try{
	if (wfTask=="Draft Workorder" && wfStatus=="Workorder Drafted"){
		useAppSpecificGroupName=false;
		var location=getAppSpecific("Location");
		var description=getAppSpecific("Description");
		var priority=getAppSpecific("Work Order Priority");
		if (isBlankOrNull(location)|| isBlankOrNull(description) || isBlankOrNull(priority)){
			throw "Content incomplete please populate workflow information to use this status";
		}
	}
}catch(e){
	cancel = true;
	showMessage = true;
	comment(e);
}
}