import React, { useState } from "react";
import "../pages/Login.css";
import bluePanelImage from "../assets/blue-panel.png";
import { loginUser } from "../Services/apiUsers"; // Removed loginWithGoogle

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying success or error messages

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      setMessage(`Login successful! Welcome, ${data.user.name.firstName}`);
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <img src={bluePanelImage} alt="Blue Panel" className="sloth-image" />
      </div>
      <div className="right-panel">
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <label className="input-label">Email</label>
            <input
              type="text"
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
          <p
            className={`message ${
              message.startsWith("Login failed") ? "error" : ""
            }`}
          >
            {message}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
