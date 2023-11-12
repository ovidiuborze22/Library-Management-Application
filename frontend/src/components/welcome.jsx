import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

// Welcome page for Library Management System
function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-text">
        <h1>Welcome to the Library Management System</h1>
        <p>
          If you already have an account, please <Link to="/login">login</Link>.
        </p>
        <p>
          Don't have an account yet? Please <Link to="/register">register</Link>.
        </p>
      </div>
      <div className="welcome-image"></div>
    </div>
  );
}

export default Welcome;
