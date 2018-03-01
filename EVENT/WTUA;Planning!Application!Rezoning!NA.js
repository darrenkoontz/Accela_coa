/*
Title : Set Rezoning Expiration Date (WorkflowTaskUpdateAfter) 

Purpose : When the workflow task "City Council Meeting" has a status of "Approved" then update the expiration date to 5 years from
the current date.

Author: Yazan Barghouth 
 
Functional Area : Records

Sample Call:
	calculateAndUpdateRezoningExpirationDate("City Council Meeting", [ "Approved" ], "Expiration Date", 5);
	
Notes:
	- used ASI 'Expiration Date'
*/

calculateAndUpdateRezoningExpirationDate("City Council Meeting", [ "Approved" ], "Expiration Date", 5);
