// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Profile.css";
// import welcomeImage from "../assets/welcome-bg.jpg"; // Background image
// import logo from "../assets/company-logo.jpeg"; // Company logo

// const Profile = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="welcome-container">
//       {/* Background Image & Overlay */}
//       <div className="background-overlay"></div>

//       {/* Main Content */}
//       <div className="content">

//         {/* Title & Description */}
//         <h1>Welcome to IT HelpDesk Insight</h1>
//         <p>Streamlining Incident Management with AI-Powered Analytics</p>

//         {/* Features Section - Three boxes in one line */}
//         <div className="features">
//           <div className="feature-card">
//             <h3>📊 Real-Time Analytics</h3>
//             <p>Track incidents and generate reports instantly.</p>
//           </div>
//           <div className="feature-card">
//             <h3>⚡ Fast Issue Resolution</h3>
//             <p>Resolve IT issues quickly with smart automation.</p>
//           </div>
//           <div className="feature-card">
//             <h3>🔒 Secure & Reliable</h3>
//             <p>Your data is protected with enterprise-grade security.</p>
//           </div>
//         </div>

//         {/* Call-to-Action Buttons */}
//         <div className="cta-buttons">
//           <button className="login-btn" onClick={() => navigate("/login")}>
//             Login
//           </button>
//           <button className="signup-btn" onClick={() => navigate("/signup")}>
//             Sign Up
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="welcome-footer">
//         <p>&copy; 2024 IT HelpDesk Insight. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Login from "../LoginForm/login";
import SignUp from "../SignUpForm/signUp";
import ForgotPassword from "../ForgotPasswordForm/forgotPassword";

const Profile = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* Background Image & Overlay */}
      <div className="background-overlay"></div>

      {/* Main Content */}
      <div className="content">
        <h1>Welcome to ITCare Insight</h1><br></br>
        <h3>Streamlining IT HelpDesk Incident Management Analytics</h3>

        {/* Features Section */}
        <div className="features">
          <div className="feature-card">
            <h3>📊 Real-Time Analytics</h3>
            <p>Track incidents and generate reports instantly.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Fast Issue Resolution</h3>
            <p>Resolve IT issues quickly with smart automation.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Accurate Predictions</h3>
            <p>predictions for assigning groups to resolve issues.</p>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="cta-buttons">
          <button className="login-btn" onClick={() => setIsLoginOpen(true)}>
            Login
          </button>
          <button className="signup-btn" onClick={() => setIsSignUpOpen(true)}>
            Sign Up
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="welcome-footer">
        <p>&copy; 2024 IT HelpDesk Insight. All rights reserved.</p>
      </footer>

      {/* Popups */}
      {isLoginOpen && (
        <Login
          closeLogin={() => setIsLoginOpen(false)}
          openForgotPassword={() => {
            setIsLoginOpen(false);
            setIsForgotPasswordOpen(true);
          }}
          openSignUp={() => { 
            setIsLoginOpen(false);
            setIsSignUpOpen(true); 
          }} // ✅ Pass `openSignUp` to Login
        />
      )}
      
      {isSignUpOpen && <SignUp 
          closeSignUp={() => setIsSignUpOpen(false)} 
          openLogin={() => { 
              setIsSignUpOpen(false); // Close SignUp Popup
              setIsLoginOpen(true);   // Open Login Popup
          }} 
      />}
      
      {isForgotPasswordOpen && (
        <ForgotPassword closeForgotPassword={() => setIsForgotPasswordOpen(false)} />
      )}
    </div>
  );
};

export default Profile;
