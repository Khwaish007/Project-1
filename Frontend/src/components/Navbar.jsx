import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `block px-4 py-3 rounded-md text-base font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  const navLinks = [
    { to: "/portfolio", text: "Our Work" },
    { to: "/about", text: "About Us" },
    { to: "/blogs", text: "Blogs" },
    { to: "/contact", text: "Contact" },
    { to: "/submit-project", text: "Submit Project" },
  ];

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white font-bold text-xl">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ProjectHub
              </span>
            </NavLink>
          </div>

          {/* Hamburger Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 w-8 h-8 flex flex-col justify-between items-center focus:outline-none"
              aria-controls="main-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <span
                className={`block w-full h-0.5 bg-gray-300 transform transition duration-300 ease-in-out ${
                  isOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              ></span>
              <span
                className={`block w-full h-0.5 bg-gray-300 transition duration-300 ease-in-out ${
                  isOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block w-full h-0.5 bg-gray-300 transform transition duration-300 ease-in-out ${
                  isOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              ></span>
            </button>

            {/* Dropdown Menu Panel */}
            <div
              id="main-menu"
              className={`absolute right-0 mt-4 w-64 origin-top-right bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="p-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={navLinkClasses}
                    role="menuitem"
                  >
                    {link.text}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;