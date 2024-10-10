import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, fetchUserInfo } from "../Services/apiUsers";
import "./Login.css";
import FriendlySloth from "../assets/FriendlySloth.svg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message); // Set the logout message
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem("token", token);

      const { data: user } = await fetchUserInfo(token);

      if (user.role !== "lecturer" && user.role !== "admin") {
        setError("Access restricted to lecturers and admins only.");
        localStorage.removeItem("token");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
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
        {message && <p className="login__success">{message}</p>}{" "}
        {/* Green message */}
        {error && <p className="login__error">{error}</p>} {/* Error message */}
        <form className="login__form" onSubmit={handleLogin}>
          <div className="login__input-field">
            <div className="login__input-label">Email</div>
            <input
              className="login__input"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login__input-field">
            <div className="login__input-label">Password</div>
            <input
              className="login__input"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
