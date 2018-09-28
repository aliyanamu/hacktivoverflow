import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyD1XXO4vmhAMRauI2SshYCzuBKWPOGm8ug',
  authDomain: 'hackover-e3fb4.firebaseapp.com',
  databaseURL: 'https://hackover-e3fb4.firebaseio.com',
  projectId: 'hackover-e3fb4',
  storageBucket: 'hackover-e3fb4.appspot.com',
  messagingSenderId: '407938998548'
}

let db = firebase.initializeApp(config).database()

export default db
