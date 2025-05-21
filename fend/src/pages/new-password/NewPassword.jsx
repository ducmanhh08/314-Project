// Import necessary React hooks and navigation tools
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection after success
import styles from './NewPassword.module.css'; // Adjust path if needed


function NewPassword() {
  // State for password fields
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for feedback messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [variant, setVariant] = useState('');

  // React Router hook to navigate to login page
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Clear previous messages
    setMessage('');
    setError('');
    setVariant('');

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Validate matching passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simulate success
    setMessage('Password created successfully! Redirecting to login...');
    setVariant('success');

    // Redirect to login after 2 seconds
    setTimeout(() => {
      // Adjust this path if your login page has a different route
      navigate('/login');
    }, 2000);
  };

  return (
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
    <>
      <div className={styles['page-title']}>New Password Page</div>
      <div className={styles['new-password-wrapper']}>
        {/* Form container */}
        <div className={styles['form-container']}>
          {/* App branding */}
          <div className={styles['branding']}>Ticket<br />Please?</div>

          {/* Inner box that contains the form */}
          {/* The original code had a form-box div without content or styling from the CSS, so it's removed for cleaner code unless it has a specific purpose that's not immediately obvious */}
          <h2 className={styles['form-title']}>New Password</h2>
          <p className={styles['form-subtext']}>
            Please create a new password. For security, we recommend a unique password you haven't used before.
          </p>

          {/* Password creation form */}
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

          {/* Feedback messages */}
          {error && <div className={`${styles['alert']} ${styles['alert-danger']}`}>{error}</div>}
          {message && <div className={`${styles['alert']} ${styles[`alert-${variant}`]}`}>{message}</div>}
        </div>
      </div>
    </>
  );
};

// Export for use in App.js
export default NewPassword;
