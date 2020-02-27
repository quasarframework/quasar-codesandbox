import * as firebase from "firebase/app"
// import * as admin from'firebase-admin';

import "firebase/auth"
import "firebase/database"

// ADD YOUR FIREBASE CONFIG OBJECT HERE:
var firebaseConfig = {
  apiKey: "AIzaSyCGwS3NWL3xYXv7P6KBSrlGUGBrWqvU7Sw",
  authDomain: "todo-f66c9.firebaseapp.com",
  databaseURL: "https://todo-f66c9.firebaseio.com",
  projectId: "todo-f66c9",
  storageBucket: "todo-f66c9.appspot.com",
  messagingSenderId: "780412439738",
  appId: "1:780412439738:web:f9cf622f0da1708c9a4683",
  measurementId: "G-VRNKHTYMW2"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()
let fireStore = firebaseApp.firestore

export { firebaseAuth, firebaseDb, fireStore }