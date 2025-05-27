//import react & useState hook from react library
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';


function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContinue = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/check-email', {
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
    // #region Code before CSS Module
    // <div className="forgot-password-page-wrapper">
    //   <div className="page-title">Forgot Password Page</div>
    //   {/* Outer container to center and style the content*/}
    //   <div className="forgot-container">
    //     {/* App branding */}
    //     <div className="branding">Ticket<br />Please?</div>
    //     {/* Inner box that contains the form */}
    //     <div className="forgot-box">
    //       {/* Title of the page */}
    //       <h2>Forgot Password</h2>
    //       {/* Instruction shown above the input field */}
    //       <small>Enter your email address</small>

    //       {/* Form with email input & continue button */}
    //       <form onSubmit={handleContinue}>
    //         {/* Email input field */}
    //         <input
    //           // Set the input type to email
    //           type="email"
    //           // Placeholder shown inside the input
    //           placeholder="Enter email address"
    //           // Controlled input bound to state
    //           value={email}
    //           // Update email state on typing            
    //           onChange={(e) => setEmail(e.target.value)}
    //           // Makes the input field mandatory
    //           required
    //         />

    //         {/*Continue button*/}
    //         <button type="submit" onClick={() => navigate('/new-password')}>Continue</button>
    //       </form>

    //       {/* Conditionally show the message if it exists */}
    //       {message && <p className="message">{message}</p>}
    //     </div>
    //   </div>
    // </div>
    // #endregion
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