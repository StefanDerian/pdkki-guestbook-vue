

import Firebase from 'firebase'
let config = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId
};

var app = Firebase.initializeApp(config)


var db = app.database()
export {db, app}
