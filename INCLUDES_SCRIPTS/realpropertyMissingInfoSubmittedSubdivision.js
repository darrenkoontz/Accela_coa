/*

This is script 287 which checks if record status is "Waiting on Documents" AND
the Workflow step is currently "Application Status" AND
the workflow status is "Missing Information"

JMAIN

*/

logDebug("Start realpropertyMissingInfoSubmittedSubdivision.js")

//get today's date in mm/dd/yyyy format
var d = new Date;
month = d.getMonth() +1;
day = d.getDate();
year = d.getFullYear();
currentdate = month + "/" + day + "/" + year;
logDebug("Today is " + currentdate);

//get five business days from today
var fivebusinessdays = dateAdd(currentdate, 5, "Y");
logDebug("5 business days is " + fivebusinessdays);

//get the current overal record status
var currentrecordstatus = capStatus;
logDebug("Record Status is " + currentrecordstatus);

//check if the active task is "Application Acceptance"
var tasktocheck = "Application Acceptance";
var iscorrecttask = isTaskActive(tasktocheck);
logDebug("iscorrecttask " + iscorrecttask);

//check if the active workflow status is "Missing Information"
var istaskstatus = isTaskStatus("Application  Acceptance", "Missing Information");
logDebug("istaskstatus: " + istaskstatus);

//run the business logic