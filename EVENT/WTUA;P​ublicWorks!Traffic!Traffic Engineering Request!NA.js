/*------------------------------------------------------------------------------------------------------/
| Event			: WorkflowTaskUpdateAfter /Record Type :PUBLICWORKS/TRAFFIC/TRAFFIC ENGINEERING REQUEST/NA
|
| Purpose		: Create Ad Hoc task Final Response Sent
| Notes			: 
| Created by	: ISRAA
| Created at	: 01/02/2018 16:19:04
|
/------------------------------------------------------------------------------------------------------*/
if (wfTask=="Application Submittal"){
	useAppSpecificGroupName=false;
	var finalRespReq=getAppSpecific("Final Response Required",capId);
	if (finalRespReq=="CHECKED"){
	 	var res=addAdHocTask("ADHOC_WORKFLOW","Final Request Sent");
	}
}