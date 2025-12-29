import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfirm,setShowConfirm]=useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Hide navbar if user not logged in
  if (!user) return null;

  return (
    <>
    <nav className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <h2>TaskHive</h2>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <div className="user-info">
          <span className="username">👋 {user.username}</span>
          <span className="email">{user.email}</span>
        </div>

        <button className="logout-btn" onClick={() => setShowConfirm(true)}>
          Logout
        </button>
      </div>
    </nav>

      {showConfirm && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className="logout-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  );
};

export default Navbar;
