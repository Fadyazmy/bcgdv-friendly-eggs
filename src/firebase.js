import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

  var firebaseConfig = {
    apiKey: "AIzaSyAjUt2ZM6QZ9WVxChJrxrY1KrbK8ttUWNY",
    authDomain: "friendlyeggsfeedback.firebaseapp.com",
    databaseURL: "https://friendlyeggsfeedback.firebaseio.com",
    projectId: "friendlyeggsfeedback",
    storageBucket: "friendlyeggsfeedback.appspot.com",
    messagingSenderId: "934423992516",
    appId: "1:934423992516:web:fdd8c3515cce85a4015191",
    measurementId: "G-V759EM1H3P"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
// firestore.settings({ timestampsInSnapshots: true })
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = (args) => {
  // BEFORE: auht.signInWithPopup(provider)
  // AFTER (for mobile), doesn't work on safari for some reason
  auth.signInWithRedirect(provider)
}

/**
 * 
 * export const signInWithGoogle = (args) => {
    auth.signInWithPopup(provider).then(function(result) {
    return auth.signInWithCredential(result.credential);
  })
}
 */

// signInWithRedirect
  
export const signOut = () => auth.signOut();

export const signInWithEmailAndPassword = ({email, password}) => auth.signInWithEmailAndPassword(email, password)

// const provider = new firebase.auth.GoogleAuthProvider()
//       credential: firebase.auth.AuthCredential
// export const prov = new firebase.auth.GoogleAuthProvider
// console.log("credential: ", prov)
export const signInWithCredential = () => auth.signInWithCredential(provider.credential(firebaseConfig.appId));

export const sendPasswordResetEmail = ({email, actionCodeSettings}) => auth.sendPasswordResetEmail(email, actionCodeSettings)

export const sendSignInLinkToEmail = (email) => auth.sendSignInLinkToEmail(email)

export const sendEmailVerification = () => {
  auth.currentUser.sendEmailVerification();
}
// export const emailVerified = auth.currentUser.reload()

// export const isEmailVerified = () => auth.isEmailVerified()

// const settings = {timestampsInSnapshots: true};
// firestore.settings(settings);

window.firebase = firebase;

export const createUserProfileDocument = async (user, additional_data) => {
  if(!user) return;

  // see if user has prof is db 
  // get a reef place in the db where the user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that locatioon
  const snapshot = await userRef.get();

  if (!snapshot.exists){
    const { displayName, email, photo_url } = user;
    const created_at = new Date();

    try{
      await userRef.set({
        displayName, 
        email,
        photo_url,
        created_at, 
        ...additional_data
      })
    } catch (error) {
      console.error('Error creating user: ', error.message)
    }
  }


  return getUserDocument(user.uid)
}

export const getUserDocument = async (uid) => {
  if(!uid) return null;

  try {
    return firestore.collection('users').doc(uid)

  } catch (error) {
    console.error('Error fetching user: ', error.message)
  }
}

export default firebase;
