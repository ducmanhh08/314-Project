import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://ticket-please.onrender.com";

const SignUpPage = () => {
  const [role, setRole] = useState('guest');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = form.password;
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: role === 'guest' ? 'ATTENDEE' : 'ORGANIZER',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className={styles['signup-container']}>
      <div className={styles['signup-card']}>
        {/* Left Section */}
        <div className={styles['signup-left']}>
          <img src="/images/logo.jpg" alt="logo" className={styles['logo-img']} onClick={() => navigate('/')} />
          <h2>Welcome back</h2>
          <p>
            Sign in to stay connected and make the most of your exclusive offers.
          </p>
          <button className={styles['login-button']} onClick={() => navigate('/login')}>Login</button>

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
          <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input type="text" placeholder="User Name" />

            <label>Full Name <span style={{ color: 'red' }}>*</span></label>
            <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} required />

            <label>Phone Number</label>
            <input type="text" placeholder="Phone Number" />

            <label>Email <span style={{ color: 'red' }}>*</span></label>
            <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />

            <label>Password <span style={{ color: 'red' }}>*</span></label>
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

            <label>Confirm Password <span style={{ color: 'red' }}>*</span></label>
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" className={styles['signup-button']}>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
