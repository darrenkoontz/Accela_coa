//WTUA:Building/Permit/*/*

updateExpirationDateAsi();

/*
Title : Set the Code Reference custom field value (WorkflowTaskUpdateAfter)
Purpose : If the workflow status = "Issued" and the custom field "Code Reference" is not filled out with data then
          update the "Code Reference" field with the value "2015 I-Codes/Aurora Muni Codes/2017-NEC".

Author: Ahmad WARRAD
 
Functional Area : Records

Sample Call:
	setCodeReference("Complete");

Notes:
1- The script will update the "Code Reference" custom field, when the workflow status = "Complete"
*/

// In specification record the status is "Issued", but we set it to "Complete", since we didn't find an "Issued" status
var wfStatusCompareVal = "Complete";
setCodeReference(wfStatusCompareVal);
