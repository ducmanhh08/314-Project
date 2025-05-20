import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

function SignUp() {
  // const [count, setCount] = useState(0)
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
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
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
    <div className="signup-container">
      
      <div className="card">
        <div className="signup-form">
        <center><h1 className="signup">Sign up</h1></center>
          <center><h2 className="PROMO">Unlock your personalized journey by entering personal details below.</h2></center>
          <form onSubmit={handleSubmit}>
            <label className="fn">First Name</label>
            <input className="box" name="name" type="text" placeholder="First Name" value={form.name} onChange={handleChange} required />
            <label className="fn">Last Name</label>
            <input className="box" name="email" type="text" placeholder="Last Name" value={form.email} onChange={handleChange} required />
            <label className="fn">Password</label>
            <input className="box" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <label className="fn"> Confirm Password</label>
            <input  className="box" name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required/>

          <center><button className="signup-button">Sign up</button></center></form>
        </div>
        <div className="signup-right">
          
          <h2>Welcome back</h2>
          <p>Sign in to stay connected and make the most of your exclusive offers.</p>
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  );
}


export default SignUp;