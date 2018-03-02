/*
Title : Reactivate Completeness Check (DocumentUploadAfter)
Purpose : When any document is uploaded and the workflow task 'Completeness Check #2' has a status of 'Resubmittal Requested'
then reactivate the workflow task 'Completeness Check'

Author: Yazan Barghouth 
 
Functional Area : Records

Sample Call:
	checkWfTaskToActivateAnother("Completeness Check #2", "Resubmittal Requested", "Completeness Check");
*/

checkWfTaskToActivateAnother("Completeness Check #2", "Resubmittal Requested", "Completeness Check");
