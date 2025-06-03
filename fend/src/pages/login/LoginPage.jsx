import React from "react";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        setMessage(data.message);
        navigate('/homepage');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-left']}>
        <img src="/images/logo.jpg" alt="logo" className={styles['logo-img']} />
        <h1>Welcome to...</h1>
        <p>
          Your gateway to unforgettable live experiences.
          From concerts and theater shows to sports events and festivals,
          we bring the best seats right to your screen.
        </p>
      </div>
      <div className={styles['login-right']}>
        <h2>Login</h2>
        <p>Welcome! Login to get amazing discounts and offers only for you.</p>
        <form onSubmit={handleLogin}>
          <label className={styles['ha']}>User Name</label>
          <p><input type="text" placeholder="Enter your username" className={styles['input-field']}
            value={email}
            onChange={e => setEmail(e.target.value)} /></p>

          <label className={styles['ha']}>Password</label>
          <p><input type="password" placeholder="Enter your password" className={styles['input-field']}
            value={password}
            onChange={(e) => setPassword(e.target.value)} /></p>

          <div className={styles['checkbox-container']}>
            <input type="checkbox"
              checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
            <span>Remember me</span>
          </div>

          <button type="submit" className={styles['button']}>  Login</button>

          <div className={styles['signup-link']}>
            <span>New User?
              <a href="#" className={styles['baba']} onClick={e => { e.preventDefault(); navigate('/sign-up'); }}>Signup</a>
            </span>
            <a href="#" className={styles['forgot-password']}
              onClick={e => { e.preventDefault(); navigate('/forgot-password'); }}>Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;