//import react & useState hook from react library
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';


function ForgotPassword() {
  //state to store user email input
  const [email, setEmail] = useState('');
  //state to store a feedback message after submission
  const [message, setMessage] = useState('');

  //handle form submission
  const handleContinue = (e) => {
    //prevent page reload on form submission
    e.preventDefault();

    //simulate successful submission
    setMessage(
      'If the email is registered, a reset link has been sent.'
    );
  };
  const navigate = useNavigate();

  //return the JSX layout for the password 
  return (
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
    <div className={styles['forgot-password-wrapper']}>
      <div className={styles['page-title']}>Forgot Password Page</div>
      {/* Outer container to center and style the content*/}
      <div className={styles['forgot-container']}>
        {/* App branding */}
        <div className={styles['branding']}>Ticket<br />Please?</div>
        {/* Inner box that contains the form */}
        <div className={styles['forgot-box']}>
          {/* Title of the page */}
          <h2 className={styles['forgot-title']}>Forgot Password</h2>
          {/* Instruction shown above the input field */}
          <small>Enter your email address</small>

          {/* Form with email input & continue button */}
          <form onSubmit={handleContinue}>
            {/* Email input field */}
            <input
              // Set the input type to email
              type="email"
              // Placeholder shown inside the input
              placeholder="Enter email address"
              // Controlled input bound to state
              value={email}
              // Update email state on typing
              onChange={(e) => setEmail(e.target.value)}
              // Makes the input field mandatory
              required
            />

            {/*Continue button*/}
            <button type="submit" onClick={() => navigate('/new-password')}>Continue</button>
          </form>

          {/* Conditionally show the message if it exists */}
          {message && <p className={styles['message']}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

//export component to use in App.js
export default ForgotPassword;