import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import ProjectForm from './components/ProjectForm';
import ProjectManager from './components/ProjectManager';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Blogs from './components/Blogs';
import BlogPost from './components/BlogPost'; // Import the new component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} /> {/* Add this new route */}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/submit-project" element={<ProjectForm />} />
          <Route path="/admin" element={<ProjectManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;