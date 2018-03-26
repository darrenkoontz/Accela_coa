// ASA:P​ublicWorks/Traffic/Traffic Engineering Request/NA

script140_AppSubmitAcceptedActivateTrafficInvestigation();
script175_AssignApplicationSubmittalTask();
script265_ManagerReviewToSupervisor();

/*

Script ID-145:
Emmett T. Wylam
Script to populate the record name with intersection data from GIS
 
var vIntersection;
var vFound = false;
var vBuffer = 10;
while (vFound == false) {
	vIntersection = getGISInfoArray_Buffer("AURORACO", "Intersections", ["INTERSECTION"], vBuffer, "feet");
	if (vIntersection.length > 0) {
		vFound = true;
		logDebug("Intersection: " + vIntersection[0]["INTERSECTION"]);
		editAppName(vIntersection[0]["INTERSECTION"]);
	} else {
		vBuffer = vBuffer + 10;
		if (vBuffer == 500) {
			logDebug("Buffer Overrun");
			vFound = "Buffer overrun";
		}
	}
}
*/