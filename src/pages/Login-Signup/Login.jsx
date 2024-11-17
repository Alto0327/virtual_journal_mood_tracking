import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { Link } from "react-router-dom"

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async(e) => {
        e.preventDefault()

        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) =>{
            const user = userCredentials.user
            console.log(user)
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
        })
    }


    return(
        <div>
            <h1>LOGIN</h1>
            <form>
                <div>
                    <label htmlFor="">
                        Email
                    </label>
                    <input 
                        type="text"
                        label="Email Address"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    
                    <label htmlFor="">
                        Password
                    </label>
                    <input 
                        type="text"
                        label="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" onClick={handleLogin}> login</button>
            </form>
        </div>
    )
}

export default Login