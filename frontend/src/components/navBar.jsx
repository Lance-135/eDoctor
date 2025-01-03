// src/components/Navbar.js
import React, {useState, useEffect} from 'react';
import '../css/navBar.css'; // Import CSS for styling
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate()

  const getUser = ()=>{
    const current_user = localStorage.getItem("user")
    if (current_user == null){
      return false
    }
    else{
      
      return true
    }
  }

  const handleLogout =async () =>{
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/logout/")
      console.log(response.data.message)
      localStorage.clear()
      alrert(response.data.message)
      navigate("/home")
    } catch (error) {
      alert(error.error)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          Pneumonia Detection
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to= "/home" className='navbar-link'>Home</Link>
          </li>
          <li>
            {getUser() ? <Link to= "/home" className='navbar-link'>Profile</Link> : <Link to="/" className="navbar-link">Login/SignUp</Link>}
          </li>
          <li>
            <a href="#about" className="navbar-link">About</a>
          </li>
          <li>
            <a href="#services" className="navbar-link">Services</a>
          </li>
          <li>
            {getUser()? 
            <button className="logout-btn" onClick={handleLogout}>Logout</button>:<Link to="/home" className="navbar-link">contacts</Link>}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
