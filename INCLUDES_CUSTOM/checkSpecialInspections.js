function checkSpecialInspections() {
try{
	if (wfTask == "Certificate of Occupancy" && wfStatus == "Final CO Issued"){
		var specialInspections = getASIgroup("SPECIAL INSPECTIONS", capId);
		if (specialInspections != null) {
			var isMissingData = false;
			for (xx in specialInspections) {
				if (typeof (specialInspections[xx].getChecklistComment()) == "undefined" || isBlankOrNull(specialInspections[xx].getChecklistComment())) {
					isMissingData=true;
					break;
				}
			}
			if (isMissingData) {
				throw ("The Special Inspection fields must have data");
			}
		}
	}

}catch (e) {
	cancel = true;
	showMessage = true;
	comment(e);
}
} 