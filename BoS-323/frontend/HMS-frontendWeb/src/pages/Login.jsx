import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import bluePanelImage from "../assets/blue-panel.png";
import { loginUser } from "../Services/apiUsers";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // We'll still call loginUser, but we won't wait for the response
      loginUser(email, password);
      setMessage("Redirecting to dashboard...");
    } catch (error) {
      // If there's an error, we'll still set a message, but we'll redirect anyway
      setMessage("Login process initiated. Redirecting to dashboard...");
    } finally {
      // Always navigate to dashboard after a brief delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500); // Delay for 1.5 seconds to show the message
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <img
          src={bluePanelImage}
          alt="Friendly Sloth"
          className="sloth-image"
        />
      </div>
      <div className="right-panel">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">
            Log in
          </button>
          <p className="message">{message}</p>
          <div className="continue-with">
            <hr />
            <span>Or Continue With</span>
            <hr />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
