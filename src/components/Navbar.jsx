import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import Navbar styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">VERIVOTE</div>
      <div className="nav-links">
        <Link to="/" className="nav-item">HOME</Link>
        <Link to="/results" className="nav-item">RESULTS</Link>
        <Link to="/about" className="nav-item">ABOUT</Link>
        <Link to="/downloads" className="nav-item">DOWNLOADS</Link>
        <Link to="/help" className="nav-item">HELP</Link>
      </div>
    </nav>
  );
}

export default Navbar;
