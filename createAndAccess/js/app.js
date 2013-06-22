const DB_NAME = "TutoIndexedDB";
const LIST = "ItemsList";
const DB_VERSION = 1;
var db;

function openDB() {
	console.log("openDb ..." + new Date());
	var request = window.indexedDB.open(DB_NAME, DB_VERSION);
	request.onerror = function(event) {
		alert("Why didn't you allow my web app to use IndexedDB ?!\nDatabase error: " + event.target.error.name);
	};
	
	request.onsuccess = function(event) {
		console.log("openDb success");
	};
	
	request.onupgradeneeded = function(event) {
		console.log("upgrade needed from " + event.oldVersion + " at " + new Date());
		db = event.target.result;
		console.log("Existing objectStores:");
		for (var i=0; i<db.objectStoreNames.length; i++) {
			console.log(db.objectStoreNames[i]);
		};
	};
	
	request.onblocked = function(event) {
		// If some other tab is loaded with the database, then it needs to be closed
		// before we can proceed.
		alert("Please close all other tabs with this site open!");
	};

}

console.log("Trying to open db ..." + new Date());
openDB();