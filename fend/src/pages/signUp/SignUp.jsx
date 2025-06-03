import React, { useState } from 'react';
import styles from './SignUp.module.css';

const SignUpPage = () => {
  const [role, setRole] = useState('guest');

  return (
    <div className={styles['signup-container']}>
      <div className={styles['signup-card']}>
        {/* Left Section */}
        <div className={styles['signup-left']}>
          <img src="/images/logo.jpg" alt="logo" className={styles['logo-img']} />
          <h2>Welcome back</h2>
          <p>
            Sign in to stay connected and make the most of your exclusive offers.
          </p>
          <button className={styles['login-button']}>Login</button>

          {/* Toggle */}
          <div className={styles['role-switcher']}>
            <span>Guest</span>
            <label className={styles['switch']}>
              <input
                type="checkbox"
                checked={role === 'organizer'}
                onChange={() => setRole(role === 'guest' ? 'organizer' : 'guest')}
              />
              <span className={styles['slider']}></span>
            </label>
            <span>Organizer</span>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles['signup-right']}>
          <h1>Sign up</h1>
          <p className={styles['signup-description']}>
            {role === 'guest'
              ? 'Unlock your personalized journey. Enter your personal details to begin.'
              : 'Sign in to start your first journey as organizer. Enter your personal details to begin.'}
          </p>
          <form>
            <label>User Name</label>
            <input type="text" placeholder="User Name" />

            <label>Full Name</label>
            <input type="text" placeholder="Full Name" />

            <label>Phone Number</label>
            <input type="text" placeholder="Phone Number" />

            <label>Email</label>
            <input type="text" placeholder="Email Address" />

            <label>Password</label>
            <input type="password" placeholder="Password" />

            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm Password" />

            <button type="submit" className={styles['signup-button']}>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
