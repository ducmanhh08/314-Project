import { useState } from 'react'
import './LoginPage.module.css'

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/logo.jpg" alt="logo" className="logo-img" />
        <h1>Welcome to...</h1>
        <p>
        Your gateway to unforgettable live experiences. 
        From concerts and theater shows to sports events and festivals, 
        we bring the best seats right to your screen.
        </p>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <p>Welcome! Login to get amazing discounts and offers only for you.</p>
        <form>
          <label className='ha'>User Name</label>
          <p><input type="text" placeholder="Enter your username" className='input-field'/></p>

          <label className='ha'>Password</label>
          <p><input type="password" placeholder="Enter your password" className='input-field'/></p>

          <div className="checkbox-container">
            <input type="checkbox" />
            <span>Remember me</span>
          </div>

          <button type="submit" className='button'>  Login</button>

          <div className="signup-link">
            <span>New User? <a href="#" className='baba'>Signup</a></span>
            <a href="#" className="forgot-password">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;