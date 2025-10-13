// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigMet = {
  apiKey: "AIzaSyC6PptUhHk7pfucY6lcIsB6q_hAFXqiQSk",
  authDomain: "juegometro-77c46.firebaseapp.com",
  projectId: "juegometro-77c46",
  storageBucket: "juegometro-77c46.firebasestorage.app",
  messagingSenderId: "450368674046",
  appId: "1:450368674046:web:b300b1b587d0210e792daf",
  measurementId: "G-FXDF5ZN2D2"
};

const appMet = initializeApp(firebaseConfigMet,"Metro");

const dbMet = getFirestore(appMet);

export { dbMet };

export default appMet;