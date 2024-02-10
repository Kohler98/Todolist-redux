import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseApp, FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async()=>{
    try {
        const result = await signInWithPopup(FirebaseAuth,googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        const {displayName,email,photoURL,uid} = result.user
        
        return{
            ok:true,
            displayName,email,photoURL,uid
        }
    } catch (error) {
        const errorMessage = error.message
        return {
            ok:false,
            errorMessage,
            
        }
    }
}


export const registerUserWithEmailPassword = async({email,password,displayName}) =>{
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password)
        const {uid,photoURL} = resp.user
        // Todo : actualizar el displayname en firebase
        await updateProfile(FirebaseAuth.currentUser, {displayName})
        return{
            ok:true,
            displayName,email,photoURL,uid
        }
    } catch (error) {
 
        return {ok:false,errorMessage:error.message}
    }
}
export const loginWithEmailPassword = async({email,password}) =>{
    // funcion de 
    //signInWithEmailAndPassword
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth,email,password)
        const {uid,photoURL,displayName} = resp.user

        return{
            ok:true,
            email,photoURL,uid,displayName
        }
    } catch (error) {
        return {ok:false,errorMessage:error.message}
        
    }
}

export const logoutFirebase = async() =>{
    return await FirebaseAuth.signOut()
}