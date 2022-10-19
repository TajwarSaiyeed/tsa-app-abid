import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.init";
// import { Navigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();
const auth = getAuth(app);
const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const createNewUser = (email, password) => {
    // setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    // setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const userSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      // if (currentUser.emailVerified === true) {
      setUser(currentUser);
      setLoader(false);
      // }
      // return <Navigate to="/signup"></Navigate>;
    });

    return () => {
      unsub();
    };
  }, []);

  const authInfo = {
    createNewUser,
    signInUser,
    updateUser,
    user,
    setUser,
    userSignOut,
    loader,
    signInGoogle,
    verifyEmail,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
