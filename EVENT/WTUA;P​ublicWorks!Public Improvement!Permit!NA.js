/*------------------------------------------------------------------------------------------------------/
| Record type   : PUBLICWORKS/PUBLIC IMPROVEMENT/PERMIT/NA
| Event		: WorkflowTaskUpdateAfter
| 
| Purpose  	: Reset Workflow Due Date : When the workflow task "Verify Testing Received" has a status of "Not Received" then reset the workflow due date to
|		  current day + 30 calendar days
| Created by	: ISRAA
| Created at	: 01/02/2018 12:52:01
|
/------------------------------------------------------------------------------------------------------*/
if (wfTask=="Verify Testing Received" && wfStatus=="Not Received"){
	editTaskDueDate(wfTask,dateAdd(null,30));
	
}