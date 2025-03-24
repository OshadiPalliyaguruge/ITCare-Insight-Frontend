import React, { useState } from "react";
import "./forgotPassword.css";
import { FaEnvelope } from "react-icons/fa";
import { doPasswordReset } from "../../Firebase/auth";

const ForgotPassword = ({ closeForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await doPasswordReset(email);
      setSuccessMessage("Password reset email sent. Check your inbox.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="forgot-password-modal">
      <div className="forgot-password-wrapper">
        <span className="close-btn" onClick={closeForgotPassword}>&times;</span>
        <h1>Forgot Password</h1>
        <form onSubmit={onSubmit}>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className="icon" />
          </div>
          <button type="submit">Reset Password</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
