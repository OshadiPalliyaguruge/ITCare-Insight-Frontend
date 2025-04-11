import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, updatePassword } from "firebase/auth"
import { auth } from "./firebase"

 export const doCreateUserWithEmailAndPassword = async (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
 };

 export const doSignInWithEmailAndPassword = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
 };

 export const doSignInWithGoogle = async ()=>{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth,provider);
    return result;
 };

 export const doSignOut =()=>{
    return auth.signOut();
 };

 export const doPasswordReset = (email)=>{
    return sendPasswordResetEmail(auth,email);
 };
