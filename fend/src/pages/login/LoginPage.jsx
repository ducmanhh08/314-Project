import React from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

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
        <form>
          <label className="a">User Name</label>
          <input type="text" placeholder="Enter your username" />

          <label className="a">Password</label>
          <input type="password" placeholder="Enter your password" />

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
      </div>
    </div>
  );
}

export default LoginPage;