//import react & useState hook from react library
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContinue = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok && data.exists) {
        setMessage('A reset link has been sent to your email.');
        navigate('/new-password', { state: { email } });
      } else {
        setMessage('Email not found. Please check and try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  //return the JSX layout for the password 
  return (
    <div className={styles['forgot-password-wrapper']}>
      <div className={styles['forgot-container']}>
        <div className={styles['branding']}>Ticket<br />Please?</div>
        <div className={styles['forgot-box']}>
          <h2 className={styles['forgot-title']}>Forgot Password</h2>
          <small>Enter your email address</small>

          <form onSubmit={handleContinue}>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Continue</button>
          </form>

          {message && <p className={styles['message']}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;