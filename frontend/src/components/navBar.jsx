// src/components/Navbar.js
import React from 'react';
import '../css/navBar.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Pneumonia Detection
        </a>
        <ul className="navbar-links">
          <li>
            <Link to= "/" className='navbar-link'>Home</Link>
          </li>
          <li>
            <a href="#about" className="navbar-link">About</a>
          </li>
          <li>
            <a href="#services" className="navbar-link">Services</a>
          </li>
          <li>
            <a href="#contact" className="navbar-link">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
