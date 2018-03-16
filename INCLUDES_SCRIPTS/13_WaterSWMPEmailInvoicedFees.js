//Written by JMAIN

//determine if "Application Submittal" is the current task
var currenttask = wfTask;
logDebug("currenttask is: " + currenttask);
var correcttask = "Application Submittal";
var iscorrecttask = false;
if (currenttask == correcttask)
{
	iscorrecttask = true;	
}
logDebug("iscorrecttask: " + iscorrecttask);

//determine if the current task status is "Accepted"
var currentstatus = wfStatus;
logDebug("currentstatus is: " + currentstatus);
var taskstatustocheck = "Accepted";
var iscorrectstatus = isTaskStatus(correcttask, taskstatustocheck);
logDebug("iscorrectstatus: " + iscorrectstatus);

//Determine if there are fee balances.  Might as well load all fees and iterate through them
var allfees = loadFees();
var numfees = allfees.length;
logDebug("num fees: " + numfees.toString());
var totalfeebalance = 0.00;
for (var fee in allfees)
{
	var feecode = allfees[fee]["code"];
	var feebalance = feeBalance(feecode);
	totalfeebalance += feebalance;
}
logDebug("totalfeebalance: " + totalfeebalance.toString());

//Get the contacts
var allcontacts = getContactArray();
logDebug("Contact Arrays...");
logDebug(printObject(allcontacts));

//send some emails if necessary
if (iscorrecttask && iscorrectstatus && (totalfeebalance > 0.00))
	{
		//do some work
		
	}

