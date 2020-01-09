import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/database"
import "firebase/storage"


var firebaseConfig = {
    apiKey: "AIzaSyDgUbVEfjT--WXFJfC2_k4lZvHwwEaf4Xs",
    authDomain: "slackish-7d9f8.firebaseapp.com",
    databaseURL: "https://slackish-7d9f8.firebaseio.com",
    projectId: "slackish-7d9f8",
    storageBucket: "slackish-7d9f8.appspot.com",
    messagingSenderId: "854423268969",
    appId: "1:854423268969:web:95e87b55a15dd71af97cf8",
    measurementId: "G-KKEX61B7TZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase