import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // Add this line

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  function initializeUser(user) {
    if (user) {
      setCurrentUser(user);

      // Check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // Optional: Uncomment Google check if needed
      // const isGoogle = user.providerData.some(
      //   (provider) => provider.providerId === "google.com"
      // );
      // setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage(null); // Reset the error message
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
    handleLogin,
    errorMessage, // Add this line
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {errorMessage && ( // Add this block
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 text-center">
          {errorMessage}
        </div>
      )}
    </AuthContext.Provider>
  );
}