//Script #245
//Created by JDM 2018-03-06
//This is JDM's first - does this script even work?

if (inspResult == "Complete")
{
	{	
		editAppSpecific("Number of Failed Inspections", 0);
		closeTask("Inspection","Compliance/Complete","Updated via script","Updated via script");
		updateAppStatus("Complete","updated by script");
	}

if (inspResult =="No Violations Found")
	{
		editAppSpecific("Number of Failed Inspections", 0);
		closeTask("Inspection","No Violations Found","Updated via script","Updated via script");
		updateAppStatus("Complete","updated by script");
	}	
}

if (inspResult != "Complete" || inspResult != "No Violations Found")
{
	var numinspections = getAppSpecific("Number of Failed Inspections");
	numinspectionsint = parseInt(numinspections);
	newnuminspectionsint = numinspectionsint + 1;
	editAppSpecific("Number of Failed Inspections", newnuminspectionsint);
}