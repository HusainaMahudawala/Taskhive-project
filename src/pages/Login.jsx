import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user exists
    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!existingUser) {
      alert("Invalid email or password");
      return;
    }

    // login user
    login(existingUser);

    // redirect to home page
    navigate("/board");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome to TaskHive!</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" >
            Login
          </button>
        </form>

        <p className="switch">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
