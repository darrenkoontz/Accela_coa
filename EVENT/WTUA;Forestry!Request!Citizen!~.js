/*
Title : Activate Stump Grind workflow task (WorkflowTaskUpdateAfter)
Purpose : If the workflow task = "Crew Work" and the workflow status = "Removal" then activate the workflow task "Stump Grind" and
set the custom field "Stump Grind Priority" to the value of 2 if the workflow task "Tree Request Intake" has a status of "No
Plant".

Author: Haitham Eleisah

Functional Area : Records

Notes :
ASI Field Name "Stump Grind Priority" Not Exists so i used another field .
when the  Tree Request Intake has status of "No Plant" the work flow is not moving to another task.
so i used "Assigned" status to complete the logic
Sample Call:
updateWFtaskAndASIField("Tree Request Intake", "Crew Work", "Removal", "Stump Grind", "Area Number",2)
 */

var parentWorkflowTasktoBechecked = "Tree Request Intake";
var parentworkFlowStatustoBeChecked = "Assigned"; //"No Plant"
var workFlowTaskTobechecked = "Crew Work";
var workFlowStatusTobeChecked = "Removal";
var workflowTasktobeActivated = "Stump Grind";
var ASIFieldNametoBeUpdated = "Area Number";//"Stump Grind Priority"

updateWFtaskAndASIField(parentWorkflowTasktoBechecked, parentworkFlowStatustoBeChecked, workFlowTaskTobechecked, workFlowStatusTobeChecked, workflowTasktobeActivated,
		ASIFieldNametoBeUpdated, 2);
