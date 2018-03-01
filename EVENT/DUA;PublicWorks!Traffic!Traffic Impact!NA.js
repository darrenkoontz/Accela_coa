/*
Title : Activate workflow tasks based on document upload (DocumentUploadAfter) 

Purpose : If the document type “Traffic Impact Study” is uploaded and a workflow task has a status = “Resubmittal Requested” or
“Incomplete Submittal” then update that workflow task that has that status to the status “In Progress” and make sure that
task is active.

Author: Yazan Barghouth 
 
Functional Area : Records

Sample Call:
	ActivateWorkflowTasksBasedOnDocumentUpload("Traffic Impact Study", [ "Resubmittal Requested", "Incomplete Submittal" ], "In Progress");

*/

ActivateWorkflowTasksBasedOnDocumentUpload("Traffic Impact Study", [ "Resubmittal Requested", "Incomplete Submittal" ], "In Progress");
