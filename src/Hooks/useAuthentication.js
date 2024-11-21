import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from "../firebase"
import { useState } from "react"

function useAuthentication(){
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            setCurrentUser(user);
            console.log("Logged in user:", user);
        } catch (err) {
            setError(err.message);
            console.error("Error during login:", err.code, err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const signUp = async (email, password) => {
        setError(null)
        setLoading(true)
        try{
            const userCredential = createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            setCurrentUser(user)
            
            console.log("user: ",user," Signed up")
        }catch(error){
            setError(err)
            
            console.error(err)
        }finally{
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return {login, signUp, logout, error,loading, currentUser}
}
    
    export  default useAuthentication