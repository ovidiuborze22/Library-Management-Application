import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { Link } from "react-router-dom";
import "./loginForm.css";

// Login form
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.login(email, password);
      setMessage("Logged in successfully");
      navigate("/dashboard"); // Navigate to /dashboard on successful login
    } catch (error) {
      setMessage("Invalid email or password. Try again!");
      console.error("Login failed:", error);

      // Clear the error message after 5 seconds
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">User Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && (
        <p
          className={
            message === "Logged in successfully"
              ? "success-message"
              : "error-message"
          }
        >
          {message}
        </p>
      )}
      <p className="register-prompt">
        Don't have an account yet?{" "}
        <Link to="/register" className="register-link">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
