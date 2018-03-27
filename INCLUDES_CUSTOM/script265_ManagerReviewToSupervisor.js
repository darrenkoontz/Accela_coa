//Script 265
//Record Types:	PublicWorks\Traffic\Traffic Engineering Request\NA 
//Event: 		WTUA
//Desc:			Event WorkflowUpdateAfter 
//
//              Criteria WfTask = Draft Workorder status = Drafted workorder 
//              Action Assign wfTask Manager Review to the user who did the last status of the Supervisor Review
//
//Created By: Silver Lining Solutions

function script265_ManagerReviewToSupervisor (){
	logDebug("script265_ManagerReviewToSupervisor() started.");
	try{
		if ( wfTask == "Supervisor Review" && wfStatus == "Approved")
		{
			assignTask("Manager Review",currentUserID);
			logDebug("script265_ManagerReviewToSupervisor() - Task Supervisor Review set to: " + currentUserID);
		}
	}
	catch(err){
		logDebug("Error on custom function script265_ManagerReviewToSupervisor(). Please contact administrator. Err: " + err);
	}
	logDebug("script265_ManagerReviewToSupervisor() ended.");
};//END script265_ManagerReviewToSupervisor
