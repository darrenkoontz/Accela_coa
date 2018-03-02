
/**
 * * If the workflow status = "Issued" and the "Code Reference" custom field is empty, then update the "Code Reference"
 *   field with the value "2015 I-Codes/Aurora Muni Codes/2017-NEC".
 * @returns {void} 
 */

function setCodeReference(wfStatusCompare) {
    if (wfStatus == wfStatusCompare) {
        var codeRefVal = getAppSpecific("Code Reference");
        if (isEmpty(codeRefVal)) {
            editAppSpecific("Code Reference", "2015 I-Codes/Aurora Muni Codes/2017-NEC");
        }
    }
}
