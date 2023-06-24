import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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
const firebaseBase = initializeApp(firebaseConfig);

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
// export const signInWithGooglePopup = () =>
//   signInWithPopup(auth, googleProvider);

export const signInWithGooglePopup = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Return the user authentication information
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


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
  const collectionRef = collection(db, "categories");
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
  const userSnapShot = await getDoc(userDocRef);

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
  return userAuth;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// export const signInAuthUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;

//   return await signInWithEmailAndPassword(auth, email, password);
// };

// changed from above to below to get displayName

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Listen for changes in user authentication state
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          const userId = currentUser.uid;
          const userRef = doc(db, "users", userId);

          getDoc(userRef)
          .then((doc)=> {
            if(doc.exists) {
              const displayName = doc.data().displayName;
              resolve(displayName);
            } else {
              console.log('user does not exist')
            }
          })
          unsubscribe(); 
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
