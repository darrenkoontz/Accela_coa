//Written by JMAIN

//determine if "Application Submittal" is the current task
var currenttask = wfTask;
logDebug("currenttask is: " + currenttask);
var correcttask = "Application Submittal";
var iscorrecttask = false;
if (currenttask == correcttask)
{
	iscorrecttask = true;	
}
logDebug("iscorrecttask: " + iscorrecttask);

//determine if the current task status is "Accepted"
var currentstatus = wfStatus;
logDebug("currentstatus is: " + currentstatus);
var taskstatustocheck = "Accepted";
var iscorrectstatus = isTaskStatus(correcttask, taskstatustocheck);
logDebug("iscorrectstatus: " + iscorrectstatus);

//Determine if there are fee balances.  Might as well load all fees and iterate through them
var allfees = loadFees();
var numfees = allfees.length;
logDebug("num fees: " + numfees.toString());
var totalfeebalance = 0.00;
for (var fee in allfees)
{
	var feecode = allfees[fee]["code"];
	var feebalance = feeBalance(feecode);
	totalfeebalance += feebalance;
}
logDebug("totalfeebalance: " + totalfeebalance.toString());

//Get the contacts
var allcontacts = getContactArray();
logDebug("Contacts..." + allcontacts.length);
logDebug(printObject(allcontacts));

//grab the name and email of the appropriate contacts
var allowedcontacttypes = ["Applicant", "Developer"];
var contactstoemail = [];
for (contact in allcontacts)
{
	var contacttype = allcontacts[contact]["contactType"] + ""; //turn this into a string - lame
	logDebug("Contact type is: " + contacttype);
	//check if this contact type is in the allowed list above - if not, go on to the next one...
	//if (!exists(contacttype, allowedcontacttypes))
	if (allowedcontacttypes.indexOf(contacttype) == -1)
	{
		logDebug("Contact type IS NOT allowed - don't email...");
		continue;
	}
	
	logDebug("Contact is IS allowed - will send email...");
	var contactlastname = allcontacts[contact]["lastName"];
	var contactfirstname = allcontacts[contact]["firstName"];
	var contactemail = allcontacts[contact]["email"];
	logDebug(contactemail + " " + contactfirstname + " " + contactlastname);
	var person = {};
	person.first = contactfirstname;
	person.last = contactlastname;
	person.email = contactemail;
	contactstoemail.push(person)
}
logDebug(printObject(contactstoemail));

//send some emails if necessary
if (iscorrecttask && iscorrectstatus && (totalfeebalance > 0.00))
	{
		//send emails to the people in contacttoemail
		
		//set wfStatus to "Ready to Pay"		
		
	}

}