import { User } from "firebase/auth";
import { app } from "./firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";


export const firestore = getFirestore(app);

const addUsertoFirestore = async (user: User) => {
  
  const userRef = doc(firestore, "users", user.uid);
   // Assuming the collection is named "users"
  await setDoc(userRef, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,

  }, { merge: true });
};

export default addUsertoFirestore;