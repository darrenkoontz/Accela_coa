//Written by JMAIN

//get current task
var currenttask = wfTask;

//get current task status
var currentstatus = wfStatus;

//email if task and status are what we want
if (currenttask == "Real Property Pre Acceptance" && currentstatus == "Incomplete")
{
	//grab the name and email of the appropriate contacts
	var allcontacts = getContactArray();
	var allowedcontacttypes = ["Applicant"];
	var contactstoemail = [];
	for (contact in allcontacts)
	{
		var contacttype = allcontacts[contact]["contactType"] + ""; //force string
		logDebug("Contact type is: " + contacttype);
		//check if this contact type is in the allowed list above - if not, go on to the next one...
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
	
	//send some emails
	//todo
}