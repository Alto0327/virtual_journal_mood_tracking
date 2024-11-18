import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useState } from "react"

function useLogin() {
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

  return { login, currentUser, error, loading };
}

export default useLogin