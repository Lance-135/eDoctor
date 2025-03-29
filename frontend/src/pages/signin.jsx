// Import necessary libraries
import React, { useState } from "react";
import "../css/signin.css"; // For styling, add a CSS file
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";

const SignIn = () => {
  // State variables for form inputs
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    user_name: "",
    // email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validate = () => {
    const errors = {};

    if (!formData.user_name.trim()){
        errors.name = "Name is required.";
    } else if (5< formData.user_name.length >20){
        errors.name = "name must between 5 to 20 characters long"
    } else if (/\s/.test(formData.user_name)) {
        errors.name = "Name should not contain spaces.";
      }

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try{
        const response = await axios.post("http://127.0.0.1:8000/auth/login/", formData, {
            withCredentials: false  
        })
        console.log(response.data)
        localStorage.setItem("user", JSON.stringify({
          user_name : response.data.user_name,
          email : response.data.email,
        }))
        localStorage.setItem("jwt_token", response.data.jwt_token)
        setFormData({ user_name: "", email: "", password: "", confirmPassword: "" });
        alert(response.data.email);
        navigate("/home")
      }catch(e){
        alert(e.data)
      }
   }
  };

  return (
    <div className="signin-container">
      <h2>Welcome to Our Platform</h2>
      <p className="signin-description">Log In</p>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="Enter your user name"
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <small className="error">{errors.password}</small>}
        </div>
        <button type="submit" className="signin-btn">Login</button>
      </form>
      <p className="signin-footer">Don't have an account? <Link to="/">Signup here</Link></p>
    </div>
  );
};

export default SignIn;
