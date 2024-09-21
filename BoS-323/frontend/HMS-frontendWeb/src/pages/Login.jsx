* {
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f7f4;
}

.login-container {
  width: 360px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.right-panel {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.login-heading {
  font-size: 24px;
  margin-bottom: 24px;
  color: #333;
  text-align: left;
}

.input-field {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 16px;
  position: relative;
}

.input-label {
  position: absolute;
  top: 8px;
  left: 12px;
  font-size: 12px;
  color: #666;
}

.input {
  padding: 24px 12px 8px;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
  height: 100%;
  color: #333;
}

.forgot-password {
  text-align: right;
  margin-bottom: 16px;
}

.forgot-password a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
}

.message {
  margin-top: 10px;
  color: green;
  font-size: 14px;
}

.message.error {
  color: red;
}

.continue-with {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #666;
}

.continue-with hr {
  flex: 1;
  border: none;
  height: 1px;
  background-color: #ddd;
}

.continue-with span {
  padding: 0 10px;
  font-size: 14px;
}

.google-login {
  display: flex;
  justify-content: center;
}

.google-logo {
  width: 24px;
  height: 24px;
}