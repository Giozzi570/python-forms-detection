import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfigPun = {
  apiKey: "AIzaSyCgW4SBQv8DETQEPZBaQUQ3ohiB8q6MWoI",
  authDomain: "juegopuntos-455c0.firebaseapp.com",
  projectId: "juegopuntos-455c0",
  storageBucket: "juegopuntos-455c0.firebasestorage.app",
  messagingSenderId: "1094260469388",
  appId: "1:1094260469388:web:921cfeb0620dabaffe15a9",
  measurementId: "G-B6QHWSNS8T"
};

const appPun = initializeApp(firebaseConfigPun,"Puntos");

const dbPun = initializeFirestore(appPun, {experimentalForceLongPolling: true});

export { dbPun };

export default appPun;