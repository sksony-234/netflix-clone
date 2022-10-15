import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8LBFP80gMq6hPiB9G1XFdrp51qr77ooc",
    authDomain: "netflix-clone-5e2a2.firebaseapp.com",
    projectId: "netflix-clone-5e2a2",
    storageBucket: "netflix-clone-5e2a2.appspot.com",
    messagingSenderId: "454292996263",
    appId: "1:454292996263:web:8d2448245f93989fd75b82",
    measurementId: "G-61LF9W6ELJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { auth, firebaseApp };
export default db;