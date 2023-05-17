import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB04hqk9KJa1TqPXg4Ueg5w_3JB7UVFhZ4",
  authDomain: "e-com-platform-db.firebaseapp.com",
  projectId: "e-com-platform-db",
  storageBucket: "e-com-platform-db.appspot.com",
  messagingSenderId: "1004469873284",
  appId: "1:1004469873284:web:cae52600d3a0710ff330d1"
};

// Initialize Firebase
// This is INSTANCE
const firebaseApp = initializeApp(firebaseConfig);

// provider = google (ex.facebook etc.)
// This is CLASS
const googleProvider = new GoogleAuthProvider();

// This is INSTANCE
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
// export const signInWithGooglePopup = () => {
//     signInWithPopup(auth, provider);
// }

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)
    const userSnapShot = await getDoc(userDocRef)
    console.log(userSnapShot)
    console.log(userSnapShot.exists()) // does it exist in db? -> t/f

    // if user data does not exists
    // create / set the document ith the data from userAuth in my collection

    if (!userSnapShot.exists()) {
        const {displayName, email} =userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    // return userDocRef
    return userDocRef;
}