/*
Title : Inspection Automation (After) 
Purpose : To perform a set of action based on inspection result
Author: Yazan Barghouth 
 
 Functional Area : AV
 
 JSON Example : 
{
  "Building/Commercial/Company/amman05": {
    "InspectionResultSubmitAfter/InspectionX/Completed": [
      {
        "costRangeType": "Days",
        "costRange": 30,
        "costFeeType": "Each",
        "costFeeSchedule": "Business Fees",
        "costFeeName": "INSPECFEE",
        "costFeeAmount": 7,
        "newAppStatus":"In Review",
        "caseCreationType": "Checklist",
        "caseFailureStatus": "Yes|Done",
        "caseType": "Building/Commercial/Company/amman01",
        "caseCopyComments": true,
        "inspectionType": "Re-Inspection",
        "rangeType": "Days",
        "range": "5",
        "sameInspector": true,
        "createCondition": "Locked for Failed Inspection",
        "createConditionType": "Global",
        "createConditionSeverity": "Lock",
        "feeSchedule": "BUSINESS FEES",
        "feeName": "REINSPECFEE",
        "feeAmount": 3,
        "taskName": "Inspection",
        "taskStatus": "Failed",
        "removeCondition": "Locked for Failed Inspection",
        "removeConditionType": "Global",
        "preScript": "",
        "postScript": ""
      }
    ]
  }
}

Notes:
	- new property added 'newAppStatus': update record status if Event criteria matched (set empty to ignore)
	- new property added 'inspectionCopyComment': copy current inspection's result to the new scheduled inspection(if any)
		inspectionCopyComment: true/false
 * 
 */

eval(getScriptText("CONFIGURABLE_SCRIPTS_COMMON"));
var settingsArray = [];
if (isConfigurableScript(settingsArray, "INSPECTION_AUTOMATION")) {
	for (s in settingsArray) {

		var rules = settingsArray[s];

		//Execute PreScript
		var preScript = rules.preScript;
		if (!matches(preScript, null, "")) {
			eval(getScriptText(preScript));
		}

		var postScript = rules.postScript;

		if (rules.costRangeType != null && rules.costRangeType != "" && rules.costFeeSchedule != null && rules.costFeeSchedule != "" && rules.costFeeName != null
				&& rules.costFeeName != "" && rules.costFeeType != null && rules.costFeeType != "") {
			var costRangeDays = calculateUnifiedRange(rules.costRangeType, rules.costRange);
			var totalInspecs = 0;
			var inspecs = aa.inspection.getInspections(capId).getOutput();

			var now = new Date();
			for (i in inspecs) {
				if (inspecs[i].getInspectionDate() == null || inspecs[i].getInspectionDate() == "") {
					continue;
				}

				if (dateDiff(inspecs[i].getInspectionDate(), now) <= costRangeDays) {
					++totalInspecs;
				}
			}//for all inspections

			var calculatedFeeCost = 0;
			if (totalInspecs > 0) {
				if (rules.costFeeType.equalsIgnoreCase("once")) {
					calculatedFeeCost = rules.costFeeAmount;
				} else if (rules.costFeeType.equalsIgnoreCase("each")) {
					calculatedFeeCost = rules.costFeeAmount * totalInspecs;
				}
				addFee(rules.costFeeName, rules.costFeeSchedule, "FINAL", calculatedFeeCost, "Y");
			}
		}//can process cost fee

		if (rules.newAppStatus != null && rules.newAppStatus != "") {
			updateAppStatus(rules.newAppStatus, "by script");
		}

		var createCase = false;

		if (rules.caseCreationType != null && rules.caseCreationType != "" && rules.caseFailureStatus != null && rules.caseFailureStatus != "") {
			var failurStats = rules.caseFailureStatus.split("|");
			if (rules.caseCreationType.equalsIgnoreCase("Status")) {
				for (fs in failurStats) {
					if (failurStats[fs].equalsIgnoreCase(inspResult)) {
						createCase = true;
						break;
					}
				}
			} else if (rules.caseCreationType.equalsIgnoreCase("Checklist")) {
				var chkListResutArray = loadGuideSheetItems(inspId);
				for (cr in chkListResutArray) {
					for (fs in failurStats) {
						if (failurStats[fs].equalsIgnoreCase(chkListResutArray[cr])) {
							createCase = true;
							break;
						}
					}//for fs
					if (createCase) {
						break;
					}
				}//for chkListResutArray
			}//checklist
		}

		if (createCase) {
			var recordTypeArray = rules.caseType.split("/");
			var appCreateResult = aa.cap.createApp(recordTypeArray[0], recordTypeArray[1], recordTypeArray[2], recordTypeArray[3], "InspectionAutomation-Failed");

			if (appCreateResult.getSuccess()) {
				var newId = appCreateResult.getOutput();

				//copy inspComments
				if (rules.caseCopyComments) {
					createCapComment(inspComment, newId);//inspResultComment
				}
				aa.cap.createAppHierarchy(capId, newId);
			} else {
				logDebug("**WARN: ERROR InspectionAutomationScript Creating App [" + rules.caseType + "] err:" + appCreateResult.getErrorMessage());
			}
		}

		if (rules.inspectionType != null && rules.inspectionType != "" && rules.sameInspector != null && String(rules.sameInspector) != "" && rules.rangeType != null
				&& rules.rangeType != "" && rules.range != null && String(rules.range) != "") {
			var currInspector = null;
			schedInspection(rules.inspectionType, rules.sameInspector, rules.rangeType, rules.range, rules.inspectionCopyComment);
		}//inspection params validation

		if (rules.createConditionType != null && rules.createConditionType != "" && rules.createCondition != null && rules.createCondition != ""
				&& rules.createConditionSeverity != null && rules.createConditionSeverity != "") {
			addAppCondition(rules.createConditionType, "Applied", rules.createCondition, rules.createCondition, rules.createConditionSeverity);
		}

		if (rules.feeName != null && rules.feeName != "" && rules.feeSchedule != null && rules.feeSchedule != "" && rules.feeAmount != null && String(rules.feeAmount) != "") {
			addFee(rules.feeName, rules.feeSchedule, "FINAL", rules.feeAmount, "Y");
		}

		if (rules.taskName != null && rules.taskName != "" && rules.taskStatus != null && rules.taskStatus != "") {
			updateTaskHandleDisposition(rules.taskName, rules.taskStatus);
		}

		if (rules.removeConditionType != null && rules.removeConditionType != "" && rules.removeCondition != null && rules.removeCondition != "") {
			removeCapCondition(rules.removeConditionType, rules.removeCondition);
		}

		//Execute PostScript
		if (!matches(postScript, null, "")) {
			eval(getScriptText(postScript)); // , null, false ???
		}

	}// for all settings
}// isConfigurableScript()

/*
 * this is identical to ACCELA_FUNCTIONS version, except we replace all "**ERROR" with "**INFO"
 * from logDebug() because **ERROR causes a rollback, which we don't want.
 * */
function autoAssignInspectionLocal(e) {
	iObjResult = aa.inspection.getInspection(capId, e);
	if (!iObjResult.getSuccess()) {
		logDebug("**INFO retrieving inspection " + e + " : " + iObjResult.getErrorMessage());
		return false
	}
	iObj = iObjResult.getOutput();
	inspTypeResult = aa.inspection.getInspectionType(iObj.getInspection().getInspectionGroup(), iObj.getInspectionType());
	if (!inspTypeResult.getSuccess()) {
		logDebug("**INFO retrieving inspection Type " + inspTypeResult.getErrorMessage());
		return false
	}
	inspTypeArr = inspTypeResult.getOutput();
	if (inspTypeArr == null || inspTypeArr.length == 0) {
		logDebug("**INFO no inspection type found");
		return false
	}
	inspType = inspTypeArr[0];
	inspSeq = inspType.getSequenceNumber();
	inspSchedDate = iObj.getScheduledDate().getYear() + "-" + iObj.getScheduledDate().getMonth() + "-" + iObj.getScheduledDate().getDayOfMonth();
	logDebug(inspSchedDate);
	iout = aa.inspection.autoAssignInspector(capId.getID1(), capId.getID2(), capId.getID3(), inspSeq, inspSchedDate);
	if (!iout.getSuccess()) {
		logDebug("**INFO retrieving auto assign inspector " + iout.getErrorMessage());
		return false
	}
	inspectorArr = iout.getOutput();
	if (inspectorArr == null || inspectorArr.length == 0) {
		logDebug("**INFO no auto-assign inspector found");
		return false
	}
	inspectorObj = inspectorArr[0];
	iObj.setInspector(inspectorObj);
	assignResult = aa.inspection.editInspection(iObj);
	if (!assignResult.getSuccess()) {
		logDebug("**INFO re-assigning inspection " + assignResult.getErrorMessage());
		return false
	} else
		logDebug("Successfully reassigned inspection " + iObj.getInspectionType() + " to user " + inspectorObj.getUserID())
}

function updateTaskHandleDisposition(taskNamee, newStatus) {
	var taskResult = aa.workflow.getTask(capId, taskNamee);
	var currentTask = taskResult.getOutput();
	if (currentTask != null && currentTask != "") {
		currentTask.setDisposition(newStatus);
		var updateResult = aa.workflow.handleDisposition(currentTask.getTaskItem(), capId);
	}
}
function calculateUnifiedRange(costRangeType, costRange) {
	if (costRangeType.equalsIgnoreCase("months")) {
		return 30 * costRange;
	} else if (costRangeType.equalsIgnoreCase("days")) {
		return costRange;
	}
}

function schedInspection(inspecType, sameInspector, rangeType, rangeValue, inspectionCopyComment) {

	if (typeof inspectionCopyComment === 'undefined' || inspectionCopyComment == null) {
		inspectionCopyComment = false;
	}

	var currInspector = null;
	if (sameInspector) {
		if (inspId != null) {
			var inspResultObj = aa.inspection.getInspection(capId, inspId);
			if (inspResultObj.getSuccess()) {
				var currentInp = inspResultObj.getOutput();
				var inspUserObj = aa.person.getUser(currentInp.getInspector().getFirstName(), currentInp.getInspector().getMiddleName(), currentInp.getInspector().getLastName())
						.getOutput();
				currInspector = inspUserObj.getUserID();
			}
		}
	}

	var now = new Date();
	var inspRangeDays = calculateUnifiedRange(rangeType, rangeValue);

	var newInspComments = null;
	if (inspectionCopyComment && typeof inspComment !== 'undefined' && inspComment != "") {
		newInspComments = inspComment;
	}
	//re-sched inspection
	if (currInspector != null) {
		scheduleInspection(inspecType, parseInt(inspRangeDays), currInspector, null, newInspComments);
	} else {
		scheduleInspection(inspecType, parseInt(inspRangeDays), null, null, newInspComments);

		var inspects = aa.inspection.getInspections(capId);
		if (inspects.getSuccess()) {
			inspects = inspects.getOutput();
			inspects.sort(compareInspDateDesc);

			if (inspects != null && inspects.length > 0 && inspects[0] != null) {
				//assign inspector for last-sched inspection
				try {
					autoAssignInspectionLocal(inspects[inspects.length - 1].getIdNumber());
				} catch (ex) {
					logDebug(ex);
				}
			}//inspects !null
		}//success
	}
}
