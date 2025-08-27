// Import necessary libraries
import React, { useContext, useState } from "react";
import "../css/signin.css"; // For styling, add a CSS file
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import AuthContext from "../AuthContext";
import devconfig from "../config";
import LoadingCircle from "../components/loadingCircle";
import toast from "react-hot-toast";

const SignIn = () => {
  // State variables for form inputs
  const {login} = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
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

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true)
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try{
        const response = await axios.post(`${devconfig.API_BASE_URL}/auth/login/`, formData, {
            withCredentials: true
        })
        login({
          access_token: response.data.access, 
          refresh_token: response.data.refresh})
        setFormData({email: "", password: "", confirmPassword: "" });
        toast.success("Login Successful")
        setLoading(false)
        navigate("/home")
      }catch(e){
        toast.error(e.response.data.detail)
        setLoading(false)
      }
   }
  };

  return (
    <div>
      {
        isLoading ? <LoadingCircle width={'8'} height={'8'} /> : 
        <div className="signin-container">
      <h2>Welcome to Our Platform</h2>
      <p className="signin-description">Log In</p>
      <form onSubmit={handleSubmit} className="signin-form">
        {/* <div className="form-group">
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
        </div> */}

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
      }
    </div>
  );
};

export default SignIn;
