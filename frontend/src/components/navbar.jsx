import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";

// Navbar
function Navbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  // Checking user
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userEmail =
        parsedUser && parsedUser.user ? parsedUser.user.email : "";
      setUserEmail(userEmail);
      console.log(parsedUser);
    };

    checkUser();
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav>
      <div className="navbar-left">Library</div>
      <div className="navbar-right">
        {userEmail && (
          <div className="dropdown">
            <div className="user-email">{userEmail}</div>
            <div className="dropdown-content">
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
