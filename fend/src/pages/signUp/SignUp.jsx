import { useState } from 'react';
import styles from './SignUp.module.css';

function SignUp() {
  return (
    
    <div className={styles.signupContainer}>
      <div className={styles.card}>
        <div className={styles.signupForm}>
          <h1 className={styles.signup}>Sign up</h1>
          <h2 className={styles.PROMO}>
            Unlock your personalized journey by entering personal details below.
          </h2>

          <form>
            <label htmlFor="username" className={styles.fn}>User Name</label>
            <input id="username" name="username" className={styles.box} type="text" placeholder="User Name" />

            <label htmlFor="fullName" className={styles.fn}>Full Name</label>
            <input id="fullName" name="fullName" className={styles.box} type="text" placeholder="Full Name" />

            <label htmlFor="phone" className={styles.fn}>Phone Number</label>
            <input id="phone" name="phone" className={styles.box} type="text" placeholder="Phone Number" />

            <label htmlFor="email" className={styles.fn}>Email</label>
            <input id="email" name="email" className={styles.box} type="text" placeholder="Email Address" />

            <label htmlFor="password" className={styles.fn}>Password</label>
            <input id="password" name="password" className={styles.box} type="password" placeholder="Password" />

            <label htmlFor="confirmPassword" className={styles.fn}>Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" className={styles.box} type="password" placeholder="Confirm Password" />

            <div style={{ textAlign: 'center' }}>
              <button type="submit" className={styles.signupButton}>Sign up</button>
            </div>
          </form>
        </div>

        <div className={styles.signupRight}>
          <img src="/logo.png" alt="logo" className={styles.logoImg} />
          <h2>Welcome back</h2>
          <p>Sign in to stay connected and make the most of your exclusive offers.</p>
          <button className={styles.loginButton}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
