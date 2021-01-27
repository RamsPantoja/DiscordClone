// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDsxbP7Ehx0YVVDCg5NKobLaAAxHcWzmBw",
    authDomain: "discordclonerams.firebaseapp.com",
    databaseURL: "https://discordclonerams.firebaseio.com",
    projectId: "discordclonerams",
    storageBucket: "discordclonerams.appspot.com",
    messagingSenderId: "616637216907",
    appId: "1:616637216907:web:76ee1c1fa20233536afc8e",
    measurementId: "G-S5HMHGEHEH"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;