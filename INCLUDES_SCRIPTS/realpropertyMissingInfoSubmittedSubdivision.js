/*

This is script 287 which checks if record status is "Waiting on Documents" AND
the Workflow step is currently "Application Status" AND
the workflow status is "Missing Information"

JMAIN

*/

logDebug("Start realpropertyMissingInfoSubmittedSubdivision.js")

var currentdate = new Date(Date.now()).toLocaleString().split(", ")[0];

logDebug("Today is " + currentdate);

var fivebusinessdays = dateAdd(currentdate, 5, "Y");

logDebug("5 business days is " + fivebusinessdays);

var currentrecordstatus = capStatus;

logDebug("Record Status is " + currentrecordstatus);

//var currentworkflowstep = 