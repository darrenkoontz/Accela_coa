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

/*
Title : Auto Create Temp SWMP Application record from Civil Plans (WorkflowTaskUpdateAfter) 
Purpose : create temp record (as child) copy some data from parent IF wfstatus/task and asiField matches criteria

Author: Yazan Barghouth 
 
Functional Area : Records

Sample Call:
	autoCreateTempSWMPApplication("Plans Coordination", [ "Approved" ], "Erosion (SWMP) Report", "Water/Water/SWMP/Application");
*/

autoCreateTempSWMPApplication("Plans Coordination", [ "Approved" ], "Erosion (SWMP) Report", "Water/Water/SWMP/Application", "SWMP REQUIRES STORMWATER PERMIT # 101");






