import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Display success message
        console.log('User:', data.user); // Log user details
        navigate('/signed-in');
      } else {
        setMessage(data.message); // Display error message
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2 className="logo">Ticket<br />Please?</h2>
        <h1>Welcome to...</h1>
        <p>
          Your gateway to unforgettable live experiences. From concerts and theater shows 
          to sports events and festivals, we bring the best seats right to your screen.
        </p>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <p>Welcome! Login to get amazing discounts and offers only for you.</p>
        <form onSubmit={handleLogin}>
          <label className="a">User Name</label>
          <input type="text" placeholder="Enter your username" 
          value={email}
          onChange={e => setEmail(e.target.value)}/>

          <label className="a">Password</label>
          <input type="password" placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          <div className="checkbox-container">
            <input type="checkbox" />
            <span>Remember me</span>
          </div>

          <button type="submit">Login</button>

          <div className="signup-link">
            <span>New User? <a href="#" onClick={e => { e.preventDefault(); navigate('/sign-up'); }}>Signup</a></span>
            <a href="#" className="forgot-password" onClick={e => { e.preventDefault(); navigate('/forgot-password'); }}>Forgot your password?</a>
          </div>
        </form>
        {message && <p>{message}</p>} {/* Display login message */}
      </div>
    </div>
  );
}

export default LoginPage;