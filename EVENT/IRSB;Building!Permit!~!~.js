/*
Title : Check for Existing Inspection on Same Day (InspectionScheduleBefore) 

Purpose : check if same inspection is already Scheduled on same date, block submit

Author: Yazan Barghouth 
 
Functional Area : Records

Sample Call:
	checkScheduledInspSameDate(inspType, inspSchedDate);
	
Notes:
	Event should be ISB(InspectionScheduleBefore) not IRSB(InspectionResultSubmitBefore)
*/

checkScheduledInspSameDate(inspType, inspSchedDate);