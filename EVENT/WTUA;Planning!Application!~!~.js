/*
Title : Hearing Scheduled email and update hearing date field (WorkflowTaskUpdateAfter) 

Purpose : If the workflow task = Hearing Scheduling and workflow status = Scheduled 
then get the meeting type "Planning Commission" from the meeting tab and get the meeting date and then update
the Custom Field "Planning Commission Hearing Date".
In addition email the applicant that their hearing has been scheduled. Email template and content will be provided by Aurora.

Author: Yazan Barghouth 
 
Functional Area : Records

Sample Call:
	sendHearingScheduledEmailAndUpdateASI("Hearing Scheduling", [ "Scheduled" ], "Planning Commission", "Planning Commission Hearing Date", "MESSAGE_NOTICE_PUBLIC WORKS");
	
	Note:
		this script will abort if subType = "Address", requested in PDF:
		... Record Type: Planning/Application/{*}/{*} (except Planning/Application/Address/{*})
*/
if(!appMatch(("Planning/Application/Address/*"))){

sendHearingScheduledEmailAndUpdateASI("Hearing Scheduling", [ "Scheduled" ], "Planning Commission", "Planning Commission Hearing Date", "PLN PUBLIC HEARING EMAIL # 278");
}