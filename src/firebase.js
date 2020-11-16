import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"
import "firebase/storage"


var firebaseConfig = {
    apiKey: "AIzaSyBDjCVgKcQlP89I-ryus72-7b1DMFlt-pQ",
    authDomain: "react-slack-clone-1d8f7.firebaseapp.com",
    databaseURL: "https://react-slack-clone-1d8f7.firebaseio.com",
    projectId: "react-slack-clone-1d8f7",
    storageBucket: "react-slack-clone-1d8f7.appspot.com",
    messagingSenderId: "1057871911184",
    appId: "1:1057871911184:web:4f9b53a0ff76dbb0a22d95",
    measurementId: "G-SCJRCKSCX6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;