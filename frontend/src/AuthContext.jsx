// src/context/AuthContext.js
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from './authUtils';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking localStorage or a token
    const access_token = getAccessToken()
    setIsAuthenticated(!!access_token); // Set the authentication state based on localStorage
  }, []);

  const login = ({user_name, email, access_token, refresh_token}) => {
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({
        user_name : user_name,
        email : email,
      }))
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
  };

  const signUp = ({user_name, email, access_token, refresh_token})=>{
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({
        user_name : user_name,
        email : email,
      }))
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token")
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, access_token, refresh_token, setAccessToken, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
