import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Assuming Firebase is set up
import { onAuthStateChanged } from 'firebase/auth';

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Monitor user state changes with Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ currentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;