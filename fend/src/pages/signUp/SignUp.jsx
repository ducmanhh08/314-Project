import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import styles from './SignUp.module.css';

function SignUp() {
  // const [count, setCount] = useState(0)

  return (
    <div className={styles[my-events-container]}>
      
      <div className="card">
        <div className="signup-form">
        <center><h1 className="signup">Sign up</h1></center>
          <center><h2 className="PROMO">Unlock your personalized journey by entering personal details below.</h2></center>
          <form>
            <label className="fn">User Name</label>
            <input className="box" type="text" placeholder="User Name" />
            <label className="fn">Full Name</label>
            <input className="box" type="text" placeholder="Full Name" />
            <label className="fn">Phone Number</label>
            <input className="box" type="text" placeholder="Phone Number" />
            <label className="fn">Email</label>
            <input className="box"  type="text" placeholder="Email Name" />
            <label className="fn">Password</label>
            <input className="box"  type="password" placeholder="Password" />
            <label className="fn"> Confirm Password</label>
            <input  className="box" type="password" placeholder="Confirm Password" />

          <center><button className="signup-button">Sign up</button></center></form>
        </div>
        <div className="signup-right">
          <img src="/logo.jpg" alt="logo" className="logo-img" />
          <h2>Welcome back</h2>
          <p>Sign in to stay connected and make the most of your exclusive offers.</p>
          <button className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
}


export default SignUp;