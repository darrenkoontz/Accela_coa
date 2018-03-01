// WTUA:Fire/*/*/*

// moving to WTUB
//checkRecordAssignedUser();

/*
Title : Assign inspection Task (WorkflowTaskUpdateAfter) 

Purpose : Check WfTasks and WfStatuses, if matched, Activate and Assign a task to the user identified on the Record tab

Author: Yazan Barghouth 
 
Functional Area : Records

Sample Call:
	activateAndAssignWfTask([ "Assign Complaint", "Assign Inspection" ], [ "Complete" ], "Inspection");
	
Notes:
	- for assure WF-Task will be usable in all situation, setCompleteFlag=N added to script
*/

activateAndAssignWfTask([ "Assign Complaint", "Assign Inspection" ], [ "Complete" ], "Inspection");
