import React, { useState } from "react";
import "./Adminlogin.css";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "arnil@gmail.com" && password === "sahyadri") {
      alert("Login Successful!");
      // Redirect to Admin Dashboard (Replace with actual navigation logic)
      navigate("/admin-dashboard");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <h1 className="admin-login-header" style={{color:"black"}}>Admin Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="admin-login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Admin Username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Adminlogin;
