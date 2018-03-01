/* Title :  Auto Create Irrigation Plan Record (WorkflowTaskUpdateAfter)

Purpose :  On PublicWorks/Civil Plans/Review/NA record if wfTask "Water Review" has a wfStatus of "Signature Set Requested" and
TSI field Field Irrigation Plan Required = Yes then auto create child Water/Irrigation Plan/NA/NA record with Address,
Parcel, Contacts.

Author :   Israa Ismail

Functional Area : Records 

Sample Call : AutoCreateIrrigationPlanRecord()

Notes : 
	-The specified child record found on the environment is : "Water/Water/Irrigation Plan Review/NA" not  "Water/Irrigation Plan/NA/NA"
*/

AutoCreateIrrigationPlanRecord();





