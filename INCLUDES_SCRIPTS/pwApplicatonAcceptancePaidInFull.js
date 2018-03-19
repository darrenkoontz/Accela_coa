//Script #288 - ID - 8
//Record: PublicWorks/RealProperty/Subdivision Plat/NA
//Event: PaymentReceiveAfter 
//Criteria: When all fees are paid in Full (balance = 0) and ""Ready to Pay"" is the last status on //Application Acceptance Action then enter status ""Accepted"" in wfTask = Application Acceptance, this //should move the workflow forward and activate Review Distribution assigned to user Darren Akire with //start date = Today and end date = Today + 5 working days"
//Created by SCW 2018-03-14
//This is SCW's second - does this script even work?
logDebug("boo2 SCW");
if (balance == 0 && wfStatus == "Ready to Pay")
{
// for 5 working days (Y as third parm) from today		dateadd(,5,"Y");
		wfStatus = "Accepted";
		wfTask = "Application Accepted";
		// request should then move on and have dates calculated accordng to description above.
}
