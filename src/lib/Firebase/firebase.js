import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from './firebaseConfig'

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