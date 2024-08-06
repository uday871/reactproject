import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
// import SignUpPage from './SignUpPage';

import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ setToken, setIsAdmin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', credentials);
      const { token } = response.data;

      // Decode the token
      const decodedToken = jwtDecode(token);

      // Set the token and user role
      setToken(token);
      setIsAdmin(decodedToken.role === 'admin');

      // Redirect based on user role
      if (decodedToken.role === 'admin') {
        navigate('/ProductUpload'); // Redirect to ProductUpload page
      } else {
        navigate('/'); // Redirect to home page or another page for non-admin users
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="Loginform">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
        <div className="signup">
          <button type="button"><Link to="/SignUpPage" style={{color: 'white', textDecoration: 'none'}}>Create New Account</Link></button>
        </div>
      </form>
    </div>
  );
}
  
export default Login;
