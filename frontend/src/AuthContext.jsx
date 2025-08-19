// src/context/AuthContext.js
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [access_token, setAccessToken] = useState(null)
  const [refresh_token, setRefreshToken] = useState(null)

  useEffect(() => {
    // Check if the user is authenticated by checking localStorage or a token
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    setIsAuthenticated(!!access_token); // Set the authentication state based on localStorage
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
  }, []);

  const login = ({user_name, email, access_token, refresh_token}) => {
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({
        user_name : user_name,
        email : email,
      }))
    localStorage.setItem("access_token", access_token) // accesstoken - sent on every request 
    localStorage.setItem("refresh_token", refresh_token)
  };

  const signUp = ({user_name, email, access_token, refresh_token})=>{
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({
        user_name : user_name,
        email : email,
      }))
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("refresh_token", refresh_token)
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token")
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, access_token, refresh_token, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
