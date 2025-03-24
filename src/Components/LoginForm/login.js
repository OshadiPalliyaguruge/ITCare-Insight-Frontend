// import React, { useState } from 'react';
// import './login.css';
// import { FaUser, FaLock } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { doSignInWithEmailAndPassword } from '../../Firebase/auth'; // Adjust import based on your actual file structure
// import { useNavigate } from 'react-router-dom';

// const provider = new GoogleAuthProvider();
// const auth = getAuth();

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isSigningIn, setIsSigningIn] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [showLoginBox, setShowLoginBox] = useState(false); // State to toggle login box visibility
//     const navigate = useNavigate();  // Hook for navigation

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         if (!isSigningIn) {
//             setIsSigningIn(true);
//             try {
//                 await doSignInWithEmailAndPassword(email, password);
//                 console.log("Login successful");
//                 navigate('/dashboard');  // Redirect to the dashboard
//             } catch (error) {
//                 setErrorMessage(error.message);
//             }
//             setIsSigningIn(false);
//         }
//     };

//     const onGoogleSignIn = async (e) => {
//         e.preventDefault();
//         if (!isSigningIn) {
//             setIsSigningIn(true);
//             try {
//                 await signInWithPopup(auth, provider); // Use signInWithPopup for Google login
//                 navigate('/dashboard');  // Redirect to the dashboard
//             } catch (err) {
//                 setErrorMessage(err.message);
//             }
//             setIsSigningIn(false);
//         }
//     };

//     return (
//         <div className='page-wrapper' >
//             <div className="content-box">
//                 <h1>Welcome to Our Platform</h1>
//                 <p>Manage your tasks efficiently and securely. Sign in to get started.</p>
//                 <button 
//                     className="signin-link" 
//                     onClick={() => setShowLoginBox(true)}>
//                     Sign In
//                 </button>
//             </div>

//             {showLoginBox && (
//                 <div id='login-box' className='wrapper'>
//                     <form onSubmit={onSubmit}>
//                         <h1>Login</h1>
//                         <div className='input-box'>
//                             <input
//                                 type='email'
//                                 placeholder='UserName'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                             <FaUser className='icon' />
//                         </div>
//                         <div className='input-box'>
//                             <input
//                                 type='password'
//                                 placeholder='Password'
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                             <FaLock className='icon' />
//                         </div>

//                         <div className='remember'>
//                             <label>
//                                 <input type='checkbox' /> Remember Me
//                             </label>
//                             <a href='/forgotPassword'>Forgot Password?</a>
//                         </div>

//                         <button type='submit'>Login</button>
//                         {errorMessage && <div className="error-message">{errorMessage}</div>}
//                         <div className='register-link'>
//                             <p>Don't have an account? <a href='/signUp'>Register</a></p>
//                         </div>
//                     </form>
//                     <button className="google-sign-in" onClick={onGoogleSignIn}>
//                         <FcGoogle />
//                         <span style={{ fontSize: '13px' }}> Sign In with Google</span>
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Login;


import React, { useState } from "react";
import "./login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doSignInWithEmailAndPassword } from "../../Firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const Login = ({ closeLogin, openForgotPassword, openSignUp }) => {  // ✅ Add openSignUp here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/dashboard");
        closeLogin();
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await signInWithPopup(auth, provider);
        navigate("/dashboard");
        closeLogin();
      } catch (err) {
        setErrorMessage(err.message);
      }
      setIsSigningIn(false);
    }
  };

  return (
    <div className="login-modal">
      <div className="login-wrapper">
        <span className="close-btn" onClick={closeLogin}>&times;</span>
        <form onSubmit={onSubmit}>
          <h1>Login</h1>
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

          {/* Forgot Password Link (Right) */}
          <div className="forgot-password">
            <a href="#" onClick={openForgotPassword}>Forgot Password?</a>
          </div>

          {/* Remember Me (Next Row, Left) */}
          <div className="remember-me">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
          </div>

          <button type="submit">Login</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>

        {/* Google Sign-In Button */}
        <button className="google-sign-in" onClick={onGoogleSignIn}>
          <FcGoogle size={24} />
          <span>Sign In with Google</span>
        </button>

        {/* Register Section (Left & Right Alignment) */}
        <div className="register-container">
          <p className="no-account">Don't have an account?</p>
          <a href="#" className="register-link" onClick={openSignUp}>Register</a>  {/* ✅ Fix Here */}
        </div>
      </div>
    </div>
  );
};

export default Login;
