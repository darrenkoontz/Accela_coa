function removeDuplicatesFromMultipleParcelsTable() {
	try {
		//aa.print("Inside removeDuplicatesFromMultipleParcelsTable...");
		var asiTableName = "MULTIPLE PARCELS";

		parcelTable = loadASITable(asiTableName, capId);
		//aa.print("parcelTable Table length = " + parcelTable.length);

		//remove primary parcel if in table
		removeParcelFromTable(parcelTable, getPrimaryParcel());

		//remove duplicates in table
		removeDuplicateParcelsFromTable(parcelTable);

		//aa.print("removing old table");
		removeASITable(asiTableName);

		//aa.print("adding new table");
		addASITable(asiTableName, parcelTable);
	} catch (err) {
		//logDebug("A JavaScript Error occurred in custom function removeDuplicatesFromMultipleParcelsTable(): " + err.message);
		aa.print("A JavaScript Error occurred in custom function removeDuplicatesFromMultipleParcelsTable(): " + err.message);
	}
}