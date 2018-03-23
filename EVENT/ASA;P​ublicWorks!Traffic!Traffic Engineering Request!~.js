// ASA:P​ublicWorks/Traffic/Traffic Engineering Request/NA

// Commented out as this script was not yet deployed to Dev
//script140_AppSubmitAcceptedActivateTrafficInvestigation();
//script175_AssignApplicationSubmittalTask();

/*
Script ID-145:
Emmett T. Wylam
Script to populate the record name with intersection data from GIS
 */
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
			vFound = "Buffer overrun";
		}
	}
}
