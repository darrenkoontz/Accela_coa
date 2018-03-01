function checkInspectionType(insp2Check){
	var inspResultObj = aa.inspection.getInspections(capId);
	var finalLocation
	var resultInspType="";
	var isMatch=false;
	if (inspResultObj.getSuccess())
		{
		
		var insp2CheckArray=insp2Check.split(" ");
		var insp2checkLength=insp2CheckArray.length;
		for (i in insp2CheckArray){
			if (insp2CheckArray[i]=="Final"){
				finalLocation=i;
			}
		}
		
		inspList = inspResultObj.getOutput();
		for (xx in inspList){
			var inspType=inspList[xx].getInspectionType();
			var inspTypeArray=inspType.split(" ");
			
			var inspTypeLength=inspTypeArray.length;	
			if (insp2Check!=inspList[xx].getInspectionType() && inspTypeLength==insp2checkLength){
				var newInspType=inspType.replace(inspTypeArray[finalLocation],"Final");
				if (newInspType==insp2Check){
					isMatch=true;
					if (!inspList[xx].getInspectionStatus().equals("Passed")){
						resultInspType=inspList[xx].getInspectionType();
						break;
					}
				}
			}
			
			
			}
			
		}
		// no inspection exist of the same type but not final
		if (!isMatch) return null;
		
		return resultInspType;
}

