import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB04hqk9KJa1TqPXg4Ueg5w_3JB7UVFhZ4",
  authDomain: "e-com-platform-db.firebaseapp.com",
  projectId: "e-com-platform-db",
  storageBucket: "e-com-platform-db.appspot.com",
  messagingSenderId: "1004469873284",
  appId: "1:1004469873284:web:cae52600d3a0710ff330d1",
};

// Initialize Firebase
// This is INSTANCE
const firebaseApp = initializeApp(firebaseConfig);

// provider = google (ex.facebook etc.)
// This is CLASS
const googleProvider = new GoogleAuthProvider();

// This is INSTANCE
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// export const signInWithGooglePopup = () => {
//     signInWithPopup(auth, provider);
// }

// These are interface layer functions 
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
  
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// To write js file back to firebase db

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

// get Cartegories Collection from db ** HASH TABLES
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef)
  const userSnapShot = await getDoc(userDocRef);
  //console.log(userSnapShot)
  // console.log(userSnapShot.exists()) // does it exist in db? -> t/f

  // if user data does not exists
  // create / set the document ith the data from userAuth in my collection

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  // return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () =>  await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);