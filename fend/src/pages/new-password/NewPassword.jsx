import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NewPassword.module.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [variant, setVariant] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setVariant('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!email) {
      setError('No email found. Please restart the password reset process.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/reset_password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, new_password: password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Password updated successfully! Redirecting to login...');
        setVariant('success');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to update password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className={styles['new-password-wrapper']}>
        <div className={styles['branding']}>Ticket<br />Please?</div>
          <div className={styles['form-container']}>
            <h2 className={styles['form-title']}>New Password</h2>
            <p className={styles['form-subtext']}>
            Please create a new password. For security, we recommend a unique password you haven't used before.
            </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className={styles['form-control']}
              placeholder="Create new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className={styles['form-control']}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className={styles['btn-primary']}>Save</button>
          </form>

          {error && <div className={`${styles['alert']} ${styles['alert-danger']}`}>{error}</div>}
          {message && <div className={`${styles['alert']} ${styles[`alert-${variant}`]}`}>{message}</div>}
        </div>
      </div>
    </>
  );
}

export default NewPassword;
