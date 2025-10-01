import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Navigate to login page to refresh the state and navbar
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/portfolio" className="nav-brand">
        <h1>My Website</h1>
      </Link>
      <div className="nav-links">
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/submit-project">Submit Project</NavLink>
        <NavLink to="/admin/add-project">Add Portfolio Item</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        
        {/* Show logout button only when logged in */}
        {token && (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;