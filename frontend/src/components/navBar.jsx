// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import './navBar.css'; // Fix the import path
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/auth/logout/", null, {
        withCredentials: true
      });
      localStorage.clear();
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <span className="logo-text">Pneumonia Detection</span>
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/home" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/signin" className="nav-link">Sign In</Link>
              <Link to="/signup" className="nav-link signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
