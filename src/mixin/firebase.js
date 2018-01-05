

import Firebase from 'firebase'
let config = {
	apiKey: "AIzaSyC6FKaURd1ajoPMXhRVOslJtMn_PcNOCwk",
	authDomain: "pdkki-9d850.firebaseapp.com",
	databaseURL: "https://pdkki-9d850.firebaseio.com",
	projectId: "pdkki-9d850",
	storageBucket: "pdkki-9d850.appspot.com",
	messagingSenderId: "521954924171"
};

var app = Firebase.initializeApp(config)


var db = app.database()
export {db, app}
