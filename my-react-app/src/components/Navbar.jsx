import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import Navbar styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">VERIVOTE</div>
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/results" className="nav-item">Results</Link>
        <Link to="/verify-vote" className="nav-item">Votes</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/downloads" className="nav-item">Downloads</Link>
        <Link to="/help" className="nav-item">Help</Link>
      </div>
    </nav>
  );
}

export default Navbar;
