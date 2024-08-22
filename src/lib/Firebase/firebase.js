import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { query, collection, where, getDoc, updateDoc, doc, Timestamp } from "firebase/firestore";

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
        const docRef = doc(db, "tasks", auth.currentUser.uid)
        const docSnapshot = await getDoc(docRef);

        if(!docSnapshot.exists()){
            return 
        }

        const data = docSnapshot.data()

        // Store Firebase Timestamp as string to avoid Non-Serializable errors in Redux
        data.allTasks.forEach((task) => {
            task.completionDate = task.completionDate.toDate().toString()
        })
    
        return {
            status: true,
            data: data,
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }    
}

export const updateTask = async (id, updateData) => {
    if(!auth.currentUser){
        return {
            status: false,
            message: "Invalid User Data"
        }
    }

    try {
        const docRef = doc(db, "tasks", auth.currentUser.uid)
        const docSnapshot = await getDoc(docRef);

        if(!docSnapshot.exists()){
            return 
        }

        const data = docSnapshot.data()

        const updatedTask = {...updateData, id: id, completionDate: Timestamp.fromDate(new Date(updateData.completionDate))}

        data.allTasks.forEach((task, index) => {
            if(task.id === id){
                data.allTasks[index] = updatedTask
            }   
        })

        // console.log(data)
        await updateDoc(docRef, {
            allTasks: data.allTasks
        })

        return {
            status: true,
            message: "Task Updated Succesfully!"
        }
    } catch (error) {
        console.log("Update Error: ", error)

        return {
            status: false,
            message: error.message
        }
    }
}

export const createTask = async () => {
    if(!auth.currentUser){
        return {
            status: false,
            message: "Invalid User Data"
        }
    }

    try {
        
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}
