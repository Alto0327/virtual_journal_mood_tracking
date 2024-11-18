import { useState } from 'react'
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import useLogin from './useLogin'


function useSignUp(){
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    
    const signUp = async (e) => {
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
    return {signUp, error,loading, currentUser}
}

export default useSignUp