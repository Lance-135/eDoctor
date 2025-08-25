// src/components/Navbar.js
import React, { useState, useEffect, useContext } from 'react';
import './navBar.css'; // Fix the import path
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { getRefreshToken } from '../authUtils.js';
import use_axios from '../requests.js';
import toast from 'react-hot-toast';

const NavBar = () => {
  const {isAuthenticated, logout} = useContext(AuthContext)
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = async () => {
    console.log(isAuthenticated)
    const refresh_token = getRefreshToken()
    try {
      await use_axios.post(`/auth/logout/`, {"refresh_token": refresh_token}, {
        withCredentials: true
      });
      localStorage.clear();
      logout();
      toast.success('Logout Successful')
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.detail)
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
              <Link onClick={handleLogout} className="nav-link">Logout</Link>
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
