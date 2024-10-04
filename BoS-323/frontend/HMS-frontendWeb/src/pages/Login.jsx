import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import FriendlySloth from "../assets/FriendlySloth.svg";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <div className="login__decorative-panel">
        <div className="login__sloth-wrapper">
          <img
            src={FriendlySloth}
            alt="Friendly Sloth"
            className="login__sloth-image"
          />
        </div>
      </div>
      <div className="login__panel">
        <h1 className="login__title">Login</h1>
        <form className="login__form" onSubmit={handleLogin}>
          <div className="login__input-field">
            <div className="login__input-label">Email</div>
            <input
              className="login__input"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="login__input-field">
            <div className="login__input-label">Password</div>
            <input
              className="login__input"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="login__forgot-password">
            <span className="login__forgot-password-text">
              Forgot Password?
            </span>
          </div>
          <button type="submit" className="login__button">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
