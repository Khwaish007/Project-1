import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Layout Components
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// Import Page Components
import ProjectForm from './components/ProjectForm.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Portfolio from './components/Portfolio.jsx';
import AddPortfolioProject from './components/AddPortfolioProject.jsx';

// Import Styles
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* The Navbar will be displayed on every page */}
      <Navbar />

      <div className="container">
        <Routes>
          {/* == PUBLIC ROUTES == */}
          {/* These routes are accessible to everyone */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* == PRIVATE ROUTES == */}
          {/* These routes are protected and only accessible to logged-in users */}
          <Route 
            path="/submit-project" 
            element={
              <PrivateRoute>
                <ProjectForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/add-project" 
            element={
              <PrivateRoute>
                <AddPortfolioProject />
              </PrivateRoute>
            } 
          />

          {/* == DEFAULT ROUTE == */}
          {/* Any other URL will redirect to the portfolio page */}
          <Route path="*" element={<Navigate to="/portfolio" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

