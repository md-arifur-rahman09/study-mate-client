import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../firebase/firebase.init";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";




const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Register
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Update profile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };


    // Logout
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(user)
            setUser(currentUser);
            // axios.post("http://localhost:5000/jwt",
            //     { email: currentUser?.email },
            //     { withCredentials: true }
            // );

            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleLogin,
        updateUserProfile,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
