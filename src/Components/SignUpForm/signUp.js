// import React, { useState } from 'react';
// import { FaUser, FaLock } from "react-icons/fa";
// import './signUp.css';
// import { useNavigate } from 'react-router-dom';
// import { doCreateUserWithEmailAndPassword } from '../../Firebase/auth.js';
// import { useAuth } from '../../Firebase/authContexts.jsx';

// function SignUp() {
//     const navigate = useNavigate();

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [isRegistering, setIsRegistering] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         if (!isRegistering) {
//             setIsRegistering(true);
//             // You can add validation here to ensure passwords match, etc.
//             await doCreateUserWithEmailAndPassword(email, password);
//             navigate('/'); // Navigate to the login page after successful registration
//         }
//     }

//     return (
//         <div className='wrapper'>
//             <form onSubmit={onSubmit}>
//                 <h1>SignUp</h1>

//                 <div className='input-box'>
//                     <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
//                     <FaUser className='icon' />
//                 </div>

//                 <div className='input-box'>
//                     <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     <FaUser className='icon' />
//                 </div>

//                 <div className='input-box'>
//                     <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     <FaLock className='icon' />
//                 </div>

//                 <div className='input-box'>
//                     <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//                     <FaLock className='icon' />
//                 </div>

//                 <button type='submit'>SignUp</button>

//                 <div className='register-link'>
//                     <p>Have an account? <a href='/'>Login</a></p>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default SignUp;

import React, { useState } from "react";
import "./signUp.css";
import { FaUser, FaLock } from "react-icons/fa";
import { doCreateUserWithEmailAndPassword } from "../../Firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = ({ closeSignUp, openLogin }) => {  // ✅ Add openLogin function
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        setIsRegistering(false);
        return;
      }
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/dashboard");
        closeSignUp(); // Close popup after successful signup
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsRegistering(false);
    }
  };

  return (
    <div className="signup-modal">
      <div className="signup-wrapper">
        <span className="close-btn" onClick={closeSignUp}>&times;</span>
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Sign Up</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Already Have an Account? (Left) | Login (Right) */}
          <div className="login-container">
            <p className="already-account">Already have an account?</p>
            <a href="#" className="login-link" onClick={() => {
              closeSignUp(); // Close SignUp Modal
              openLogin();  // Open Login Modal
            }}>Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

