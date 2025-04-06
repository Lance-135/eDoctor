// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking localStorage or a token
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user); // Set the authentication state based on localStorage
  }, []);

  const login = ({user_name, email, jwt_token}) => {
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({
        user_name : user_name,
        email : email,
      }))
    localStorage.setItem("jwt_token", jwt_token) // You can store more user-specific data here if needed
  };

  const signUp = ({user_name, email, jwt_token})=>{
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({
        user_name : user_name,
        email : email,
      }))
    localStorage.setItem("jwt_token", jwt_token)
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("jwt_token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
