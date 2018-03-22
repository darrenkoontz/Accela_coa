/*
Title : Prevent License Issuance until Inspections are completed (WorkflowTaskUpdateBefore) 

Purpose : Event WorflowUpdateBefore Criteria wfTask = License Issuance and Status = Issued Action check that all Scheduled
Inspections are done, if not raise error message.

Author: Yazan Barghouth 
 
Functional Area : Records

Sample Call:
	checkInspectionsAndPreventLicenseIssuance("License Issuance", [ "Issued" ]);
*/

checkInspectionsAndPreventLicenseIssuance("License Issuance", [ "Issued" ]);


/*-----------------------------------------------------------------------------------------------------/
| Event			: WorkflowTaskUpdateAfter
| Usage			: Additional Info Required Email for Licenses MJ Applications
| Notes			: Email Template must be provided by Aurora.
|			  The Correct eParams must be used according to the provided email template ,and must include wfComment.
| Created by	: ISRAA
| Created at	: 05/02/2018 08:28:24
|
/------------------------------------------------------------------------------------------------------*/
if ( (wfTask=="City Application Intake" || wfTask=="State Application Intake" || wfTask=="Application Review") && wfStatus=="Additional Info Required"){
	sendEmail210();
}
