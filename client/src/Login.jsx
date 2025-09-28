import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
    
        try {
            // Make the API call to login
            const response = await axios.post("http://localhost:3000/login", {
                username: Email,
                password: Password,
            });
    
            // Check if login is successful
            if (response?.data?.success) {
                // Store username in localStorage
                localStorage.setItem("username", response.data.username);
    
                // Navigate to the home page
                navigate("/home");
            } else {
                // Handle invalid credentials
                setError(response?.data?.message || "Invalid email or password.");
            }
        } catch (error) {
            // Handle server or network errors
            console.error("Error during login:", error);
            setError(
                error?.response?.data?.message || "An error occurred. Please try again."
            );
        }
    }
    

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Email</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        required
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />

                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="button-container">
                    <button className="signup-btn">Sign Up</button>
                    <Link to="/admin-login"><button className="admin-btn">Admin Login</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
