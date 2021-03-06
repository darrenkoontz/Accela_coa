//Script 265
//Record Types:	PublicWorks\Traffic\Traffic Engineering Request\NA 
//Event: 		WTUA
//Desc:			Event WorkflowUpdateAfter 
//
//              when WF task 'Supervisor Review' is updated with status 'Approved',
//              then check to see if the status of task 'Draft Workorder' is status
//              'Workorder Drafted' then set assign the task 'Manager Review' to the current user
//
//Created By: Silver Lining Solutions

function script265_ManagerReviewToSupervisor (){
	logDebug("script265_ManagerReviewToSupervisor() started.");
	try{
		if ( wfTask == "Supervisor Review" && wfStatus == "Approved" && isTaskStatus("Draft Workorder","Workorder Drafted"))
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
