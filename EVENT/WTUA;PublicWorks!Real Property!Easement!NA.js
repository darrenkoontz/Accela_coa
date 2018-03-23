/*
Title : Set Completeness Check #2 to Resubmittal Requested (WorkflowTaskUpdateAfter)
Purpose : if the last of the following parallel workflow tasks is statused: (Engineering Review, Water Dept Review, Life Safety
Review, Traffic Review, Parks Review) check all these workflow tasks and IF any of the statuses are NOT = Complete then
update the workflow task "Completeness Check #2" with a status of "Resubmittal Requested" and send an email
notification to the applicant requesting revision and resubmittal of documents(
(need the email specifics).

Author: Haitham Eleisah

Functional Area : Records

Sample Call:
checkWorkFlowTaskAndSendEmail("Review Distribution","Route for Review",["Engineering Review", "Water Dept Review"], "Completeness Check #2", "Resubmittal Requested", "Complete", "MESSAGE_NOTICE_PUBLIC WORKS");
 */
var workFlowParentTask = "Review Distribution";
var workFlowParentStatus = "Route for Review";
var workflowTasks = [ "Engineering Review", "Water Dept Review", "Life Safety Review", "Traffic Review", "Parks Review" ];
var taskToUpdated = "Completeness Check #2";
var Status = "Resubmittal Requested";
var statusToCheck = "Complete";

checkWorkFlowTaskAndSendEmail(workFlowParentTask, workFlowParentStatus, workflowTasks, taskToUpdated, Status, statusToCheck, "PW EASEMENT RESUBMITAL #296");
