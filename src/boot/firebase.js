import firebase from 'firebase'
import Vue from 'vue'
import { rtdbPlugin } from 'vuefire'

Vue.use(rtdbPlugin)
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAEZZBdX9W0W4P2dGiqCsbNUAipyn698ic',
  authDomain: 'orsyncup.firebaseapp.com',
  databaseURL: 'https://orsyncup-default-rtdb.firebaseio.com',
  projectId: 'orsyncup',
  storageBucket: 'orsyncup.appspot.com',
  messagingSenderId: '24277879620',
  appId: '1:24277879620:web:8daeb60919fe2a906ee511'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.database()

export default ({ Vue }) => {
  Vue.prototype.$db = db
}
