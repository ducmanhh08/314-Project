import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState('guest');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('${API_BASE_URL}/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userRole = data.user.role.toLowerCase();

        if (role === 'guest') {
        if (userRole === 'attendee') {
          if (rememberMe) {
            localStorage.setItem('token', data.token);
          } else {
            sessionStorage.setItem('token', data.token);
          }
          navigate('/homepage');
        } else {
          setMessage('You must log in as an attendee to use guest mode.');
        }
      } else if (role === 'organizer') {
        if (userRole === 'organizer') {
          if (rememberMe) {
            localStorage.setItem('token', data.token);
          } else {
            sessionStorage.setItem('token', data.token);
          }
          navigate('/dashboard');
        } else {
          setMessage('You must log in as an organizer to use organizer mode.');
        }
      }
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
        <img src="/images/logo.jpg" alt="logo" className={styles['logo-img']} onClick={() => navigate('/')}/>
        {role === 'guest' ? (
          <>
            <h1>Welcome Guest!</h1>
            <p>
              Your gateway to unforgettable live experiences.
              From concerts and theater shows to sports events and festivals,
              we bring the best seats right to your screen.
            </p>
          </>
        ) : (
          <>
            <h1>Welcome Organizer!</h1>
            <p>
              Manage your events with ease. From creating unforgettable experiences to tracking ticket sales and
              attendee info, this is your command center for success.
            </p>
          </>
        )}
        {/* Slider Switch */}
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

      <div className={styles['login-right']}>
        <h2>Login</h2>
        <p>
          {role === 'guest'
            ? 'Welcome! Login to get amazing discounts and offers only for you.'
            : 'Please log in to create and manage your events.'}
        </p>
        <form onSubmit={handleLogin}>
          <label className={styles['ha']}>Email</label>
          <p>
            <input
              type="email"
              placeholder="Enter your email address "
              className={styles['input-field']}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>

          <label className={styles['ha']}>Password</label>
          <p>
            <input
              type="password"
              placeholder="Enter your password"
              className={styles['input-field']}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          {message && <div className={styles['error-message']}>{message}</div>}
          <div className={styles['checkbox-container']}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </div>

          <button type="submit" className={styles['button']}>Login</button>

          <div className={styles['signup-link']}>
            {role === 'guest' ? (
              <span>
                New User?{' '}
                <a
                  href="#"
                  className={styles['baba']}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/sign-up');
                  }}
                >
                  SIGN UP
                </a>
              </span>
            ) : (
              <span>
                New Organizer?{' '}
                <a
                  href="#"
                  className={styles['baba']}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/organizer-sign-up');
                  }}
                >
                  SIGN UP
                </a>
              </span>
            )}
            <a
              href="#"
              className={styles['forgot-password']}
              onClick={(e) => {
                e.preventDefault();
                navigate('/forgot-password');
              }}
            >
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
