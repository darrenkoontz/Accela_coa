/*
Title : Create parent license record (WorkflowTaskUpdateAfter) 

Purpose : for License/Professional/Application/NA WF Licese Processing status of Issued then auto create parent License record
(License/Professional/License/NA) copy Application Name (Legal Entity Name), Contacts and Custom Fields and Calculate
Expiration Date = date of issuance + 3 years then last day of the month. If February then always use the 28th and do not
have to account for leap years. In addition either Update or Create License Professional Record if it does not exist

Author: Yazan Barghouth
 
Functional Area : Records

Notes:
	- module name is Licenses not License 'License/Professional/License/NA'
	- WF Task name is 'License Issuance' not 'Licese Processing'
	- created Ref License has Expiration Date set (date of issuance + 3 years)
	- record renewal info is updated Expiration Date set (date of issuance + 3 years), Status not updated
	- must provide license type (to create)
	- must provide contact type and address type to create/update refLicense
	- a sequence and mask must be created and seqType, seqName, maskName must be passed to method
Sample Call:
	createParentLicenseRecord("License Issuance", [ "Issued" ], "Qualified Professional", "Home", "Qualified Professional");
*/

createParentLicenseRecord("License Issuance", [ "Issued" ], "Qualified Professional", "Home", "Qualified Professional");
