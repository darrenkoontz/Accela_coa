/* Title :  Update workflow, add inspection and create new record (InspectionResultSubmitBefore)

Purpose :   If the Non-warranty Inspection has an inspection result = Passed then deactivate any remaining workflow tasks. If the
inspection result = "Failed" then auto create the inspection type "Tree Removal" and Auto create child record
Forestry/Request/Planting/NA and enter "Staff" in Custom Field "Source of Request" and update the workflow task = "Tree
Planting Intake" with the workflow status = "Add to List" and activate the workflow task = "Site Review".

Author :   Israa Ismail

Functional Area : Records
 
Notes : If inspResult=="Failed" , Assumed that : enter "Staff" in Custom Field "Source of Request" and update the workflow task = "Tree
Planting Intake" with the workflow status = "Add to List" and activate the workflow task = "Site Review" must be done on the Child Record
,if it must be done on the Parent record please use the function activateTask and remove the ChildCapId from all functions calls (updateTask,editAppSpecific).

Sample Call : UpdateWFAddInspAndCreateNewRecord()

*/

UpdateWFAddInspAndCreateNewRecord();
