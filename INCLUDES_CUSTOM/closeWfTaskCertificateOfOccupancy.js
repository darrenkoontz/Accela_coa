function closeWfTaskCertificateOfOccupancy(){
if (wfTask =="Inspection Phase"  && (wfStatus == "Temporary CO Issued" || wfStatus=="Ready for CO")){
	//get the record address, check if MJ License Application exist on that address
	//Sample Application Type :Licenses/Marijuana/Retail Store/License, this should be replaced with the correct app type
	var caps= getCapByAddress("Licenses/Marijuana/Retail Store/License");
	if (caps!=false){
		closeTask("Certificate of Occupancy","Final CO Issued");
		}
	
	}
}
