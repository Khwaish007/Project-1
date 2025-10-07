import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <h2>Project Manager</h2>
        </Link>
      </div>
      <div className="nav-links">
        <Link 
          to="/portfolio" 
          className={location.pathname === '/portfolio' ? 'active' : ''}
        >
          Our Work
        </Link>
        <Link 
          to="/submit-project" 
          className={location.pathname === '/submit-project' ? 'active' : ''}
        >
          Submit Project
        </Link>
        <Link 
          to="/admin" 
          className={location.pathname === '/admin' ? 'active' : ''}
        >
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;