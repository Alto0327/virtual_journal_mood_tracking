import { useState } from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function SignUp () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("user: ",user," Signed up")
            })
            .catch((error) =>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage)
            })
    }

    return (
        <div>
            <h1>SignUp</h1>
                <form>
                    <div>
                        <label htmlFor="email-address">
                            Email
                        </label>
                        <input 
                            type="email"
                            label="Email Address"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input 
                            type="password"
                            label="Create Password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' onClick={onSubmit}>Create</button>
                </form>
        </div>
    )
}

export default SignUp
