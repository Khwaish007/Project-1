import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import ProjectForm from './components/ProjectForm';
import ProjectManager from './components/ProjectManager';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/submit-project" element={<ProjectForm />} />
          <Route path="/admin" element={<ProjectManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;