// src/context/AuthContext.js
import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, remove_tokens} from './authUtils';
import { jwtDecode } from 'jwt-decode';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated by checking localStorage or a token
    const access_token = getAccessToken()
    setIsAuthenticated(!!access_token); // Set the authentication state based on localStorage
    if(!!access_token){
      const payload = jwtDecode(access_token)
      setUid(payload.user_id)
    }
  }, []);

  const login = ({access_token, refresh_token}) => {
    setIsAuthenticated(true);
    // localStorage.setItem("user", JSON.stringify({
    //     user_name : user_name,
    //     email : email,
    //   }))
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
    remove_tokens()
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAccessToken, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
