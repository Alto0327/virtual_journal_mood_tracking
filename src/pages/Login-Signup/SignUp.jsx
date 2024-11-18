import { useState } from 'react'
import useSignUp from '../../Hooks/useSignUp'

function SignUp () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const {SignUp, loading, error, currentUser} = useSignUp()

    const handleSignUp = (e) => {
        e.preventDefault()
        SignUp(email, password)
    }

    return (
        <div>
            <h1>SignUp</h1>
                <form onSubmit={handleSignUp}>
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
                    <button type='submit' disabled={loading}>
                        {loading ? "Creating..." : "Create"}
                    </button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {currentUser ? <h1>Welcome, {currentUser.email}</h1> : null}

        </div>
    )
}

export default SignUp
