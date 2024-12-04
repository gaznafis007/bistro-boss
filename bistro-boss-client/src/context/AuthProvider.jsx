/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () =>{
    return signInWithPopup(auth, googleProvider)
  }
  const getProfile = (displayName) => {
    return updateProfile(auth.currentUser, { displayName });
  };
  const logout = () => {
    return signOut(auth);
  };
  const value = {
    user,
    loading,
    setUser,
    setLoading,
    register,
    login,
    googleLogin,
    getProfile,
    logout,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
