import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { query, collection, where, getDocs, Timestamp } from "firebase/firestore";

import { auth, db } from './firebaseConfig'

export const createUser = async (formData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(userCredential.user, { 
            displayName: formData.username,
        });

        return {
            status: true
        }
    } catch (error) {
        console.log("Failed to Create User: ", error)
        return {
            status: false,
            message: error.message
        }
    }
}

export const userSignIn = async (formData) => {
    try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);

        const user = {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        }

        return {
            status: true,
            user
        };
    } catch (error) {
        console.log("Failed to Sign In: ", error)
        return {
            status: false,
            message: error.message
        }
    }
}

export const userSignOut = async () => {
    await auth.signOut()
}

export const getTasks = async () => {
    if(!auth.currentUser){
        return {
            status: false,
            message: "Invalid User Data"
        }
    }

    try {
        const myQuery = query(
            collection(db, "tasks"),
            where("user_Id", "==", auth.currentUser.uid)
        )
    
        const querySnapshot = await getDocs(myQuery)
    
        return {
            status: true,
            data: querySnapshot.docs[0].data()
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }    
}
