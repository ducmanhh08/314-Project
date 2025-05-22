import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NewPassword.module.css';


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
      const response = await fetch('http://localhost:5000/reset_password', {
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
    // #region Code before CSS Module
    // <>
    //   <div className="page-title">New Password Page</div>
    //     <div className="new-password-wrapper">
    //     {/* Form container */}
    //       <div className="form-container">
    //       {/* App branding */}
    //         <div className="branding">Ticket<br />Please?</div>

    //       {/* Inner box that contains the form */}
    //         <div className="form-box"> </div>
    //         <h2 className="form-title">New Password</h2>
    //         <p className="form-subtext">
    //         Please create a new password. For security, we recommend a unique password you haven't used before.
    //         </p>

    //       {/* Password creation form */}
    //       <form onSubmit={handleSubmit}>
    //         <input
    //           type="password"
    //           className="form-control mb-3"
    //           placeholder="Create new password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />

    //         <input
    //           type="password"
    //           className="form-control mb-3"
    //           placeholder="Confirm your password"
    //           value={confirmPassword}
    //           onChange={(e) => setConfirmPassword(e.target.value)}
    //           required
    //         />

    //         <button type="submit" className="btn btn-primary w-100">Save</button>
    //       </form>

    //       {/* Feedback messages */}
    //       {error && <div className="alert alert-danger mt-3">{error}</div>}
    //       {message && <div className={`alert alert-${variant} mt-3`}>{message}</div>}
    //     </div>
    //   </div>
    // </>
    // #endregion
    <>
      <div className={styles['page-title']}>New Password Page</div>
      <div className={styles['new-password-wrapper']}>
        <div className={styles['form-container']}>
          <div className={styles['branding']}>Ticket<br />Please?</div>
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
