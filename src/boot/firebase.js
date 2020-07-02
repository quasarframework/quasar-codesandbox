// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'
// THIS IS WHERE YOU ALSO IMPORT REALTIME DATABASE
//import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBVi4K9VBm51hf4J7qrA7Ckm2CgWAA3l3g',
  authDomain: 'hearth-writer.firebaseapp.com',
  databaseURL: 'https://hearth-writer.firebaseio.com',
  projectId: 'hearth-writer',
  storageBucket: 'hearth-writer.appspot.com',
  messagingSenderId: '264321719178',
  appId: '1:264321719178:web:f5a4148ce51e091e1b0673',
  measurementId: 'G-3VNNS0EQL6'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

// initialize auth as well

let auth = firebase.auth()
let fs = firebase.firestore()

export { auth, fs }
