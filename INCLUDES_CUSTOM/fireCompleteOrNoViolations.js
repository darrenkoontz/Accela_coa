//Script #245
//Created by JDM 2018-03-06
//This is JDM's first - does this script even work?

function fireCompleteOrNoViolations()
{

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

}