import React from "react";
import "../pages/Login.css";
import bluePanelImage from "../assets/blue-panel.png"; // Import image directly
import googleImage from "../assets/Google-G.png"; // Import Google icon directly

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="left-panel">
        <img
          src={bluePanelImage} // Use imported image
          alt="Blue Panel"
          className="sloth-image"
        />
      </div>

      <div className="right-panel">
        <div className="input-field">
          <label className="input-label">Email</label>
          <input type="text" className="input" />
        </div>
        <div className="input-field">
          <label className="input-label">Password</label>
          <input type="password" className="input" />
        </div>
        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>
        <button className="login-button">Log in</button>
        <div className="continue-with">
          <div className="line"></div>
          <span>Or Continue With</span>
          <div className="line"></div>
        </div>
        <div className="google-login">
          <img src={googleImage} alt="Google" />{" "}
          {/* Use imported Google icon */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
