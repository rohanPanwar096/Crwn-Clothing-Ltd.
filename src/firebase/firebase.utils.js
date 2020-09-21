import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAVhHim7rFosoUQec81T-PBUUMPUP2TCU8",
  authDomain: "crown-db-3cf7e.firebaseapp.com",
  databaseURL: "https://crown-db-3cf7e.firebaseio.com",
  projectId: "crown-db-3cf7e",
  storageBucket: "crown-db-3cf7e.appspot.com",
  messagingSenderId: "297905052543",
  appId: "1:297905052543:web:ba02505eac19d04aa2d84a",
  measurementId: "G-1TQVJSCVGT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  console.log(snapshot);
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("ERROR creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
