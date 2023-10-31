
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


//MAIN for when we are not over our limit

// const firebaseConfig = {
//   apiKey: "AIzaSyBS5MEWVvo62nYu3DC80NWbjmC6UYD4cjs",
//   authDomain: "initiativefinder.firebaseapp.com",
//   projectId: "initiativefinder",
//   storageBucket: "initiativefinder.appspot.com",
//   messagingSenderId: "290519286816",
//   appId: "1:290519286816:web:8dfb829f4b086028662845",
//   measurementId: "G-K0D57VD423"
// };


// BACKUP in case the other goes down
const firebaseConfig = {
  apiKey: "AIzaSyCWZ1KLVYK1--oRNlD7z7iDcXPHyTd6dY0",
  authDomain: "initiativefinderbackup-ca3ad.firebaseapp.com",
  projectId: "initiativefinderbackup-ca3ad",
  storageBucket: "initiativefinderbackup-ca3ad.appspot.com",
  messagingSenderId: "768316786202",
  appId: "1:768316786202:web:87e1c4d914e015e4f033a3",
  measurementId: "G-TQ1PFH05DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider
export const db = getFirestore(app)