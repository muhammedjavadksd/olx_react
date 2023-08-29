
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBBbS6EeH9I9H9wjRKFbskpPsOGtBjneV4",
  authDomain: "reactolx-9a5e8.firebaseapp.com",
  projectId: "reactolx-9a5e8",
  storageBucket: "reactolx-9a5e8.appspot.com",
  messagingSenderId: "1035219951437",
  appId: "1:1035219951437:web:d4f4bc389eab0ae2402104",
  measurementId: "G-Z89XFJDK3P"
};

const fbConnection = firebase.initializeApp(firebaseConfig);
export default fbConnection