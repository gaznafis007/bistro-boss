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
import useAxiosPublic from "../hooks/usePublicAxios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic()
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
      if(currentUser){
        axiosPublic.post('/jwt', {email: currentUser?.email})
        .then(res => {
          const token = res.data.token;
          localStorage.setItem('accessToken', token)
        })
      }
      else{
        localStorage.removeItem('accessToken');
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
