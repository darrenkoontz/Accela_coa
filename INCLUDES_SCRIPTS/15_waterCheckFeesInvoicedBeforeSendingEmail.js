/*
Written by JMAIN
*/

logDebug("starting script...")

//determine if "Fee Processing" is the current task
var currenttask = wfTask;
logDebug("currenttask is: " + currenttask);
var currentstatus = wfStatus;
logDebug("currentstatus is: " + currentstatus);

var correcttask = "Fee Processing";
var iscorrecttask = false;
if (currenttask == correcttask)
{
	iscorrecttask = true;	
}
logDebug("iscorrecttask: " + iscorrecttask);

//determine if "Ready to Pay" is current status
var taskstatustocheck = "Ready to Pay";
var iscorrectstatus = isTaskStatus(correcttask, taskstatustocheck);
logDebug("iscorrectstatus: " + iscorrectstatus);

//are there any fees?
var allfees = loadFees();
var numfees = allfees.length;
logDebug("num fees: " + numfees.toString());

//are any fees invoiced?
var hasbeeninvoiced = false;
for (var fee in allfees)
{
	var feestatus = allfees[fee]["status"];
	if (feestatus.toUpperCase() == "INVOICED")
	{
		hasbeeninvoiced = true;
	}
	//bail if we find one - no need to look any further
	break;
}
logDebug("hasbeeninvoiced: " + hasbeeninvoiced);

//put a message on the website if necessary
if (iscorrecttask && iscorrectstatus && (numfees > 0) && hasbeeninvoiced == false)
{
	logDebug("Fees must be added and invoiced for Ready to Pay");
	cancel = true;
	showMessage = true;
	comment("Fees must be added and invoiced for Ready to Pay");
}
else
{
	//cancel = true;
	showMessage = true;
	comment("blah blah blah");
}

// code to pretty print the content of allfees
/*
for (var fee in allfees)
{	
	logDebug(">>>>>>>" + fee + "<<<<<<<");
	var debugline = "";
	for (var prop in allfees[fee])
	{
		debugline += prop + ":" + allfees[fee][prop] + ", ";
	}
	logDebug(debugline);
}
*/