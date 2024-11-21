import { useState } from "react"
import useAuthentication from "../../Hooks/useAuthentication"

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login, currentUser, error, loading} =useAuthentication()

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
      };


    return(
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {currentUser ? <h1>Welcome, {currentUser.email}</h1> : null}
      </div>
    )
}

export default Login