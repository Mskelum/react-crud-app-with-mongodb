import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
      <Link to="/">Logo</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/">Logout</Link>
      </div>
    </div>
  );
}

export default Navbar;
