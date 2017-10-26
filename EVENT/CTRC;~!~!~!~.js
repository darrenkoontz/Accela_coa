try{
	copyParcelGisObjects();
} catch (err) {
	logDebug("A JavaScript Error occurred: CTRCA:*/*/*/*: copyParcelGisObjects()" + err.message);
	logDebug(err.stack);
};