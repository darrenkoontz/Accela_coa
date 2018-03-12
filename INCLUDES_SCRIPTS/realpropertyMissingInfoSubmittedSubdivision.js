/*

This is script 287 which checks if record status is "Waiting on Documents" AND
the Workflow step is currently "Application Status" AND
the workflow status is "Missing Information"

JMAIN

*/

logDebug("Start realpropertyMissingInfoSubmittedSubdivision.js")

var d = new Date;
month = d.getMonth() +1;
day = d.getDate();
year = d.getFullYear();
if (month.length < 2)
{
	month = '0' + month;
}
if (day.length < 2)
{
	day = '0' + day;
}
currentdate = month + "/" + day + "/" + year;

logDebug("Today is " + currentdate);

var fivebusinessdays = dateAdd(currentdate, 5, "Y");

logDebug("5 business days is " + fivebusinessdays);

var currentrecordstatus = capStatus;

logDebug("Record Status is " + currentrecordstatus);

var workflowsteptocheck = "Application Status";

if (isTaskActive("Application Status"))
{
	logDebug("The workflow is Application Status");
}
else
{
	logDebug("The workflow is NOT Application Status");
}