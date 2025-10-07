import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Portfolio.css';

const Portfolio = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompletedProjects();
  }, []);

  const fetchCompletedProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/projects/completed');
      setCompletedProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading our work...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <h1>Our Completed Projects</h1>
        <p>Take a look at some of the amazing projects we've delivered for our clients</p>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{completedProjects.length}</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </div>

      <div className="portfolio-grid">
        {completedProjects.length === 0 ? (
          <div className="no-projects">
            <h3>More projects coming soon!</h3>
            <p>We're working on some amazing projects that will be showcased here once completed.</p>
          </div>
        ) : (
          completedProjects.map((project) => (
            <div key={project._id} className="portfolio-card">
              <div className="project-info">
                <h3>{project.projectTitle}</h3>
                <p className="project-description">{project.projectDetails}</p>
                <div className="project-meta">
                  <div className="meta-item">
                    <span className="meta-label">Client:</span>
                    <span className="meta-value">{project.name}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Completed:</span>
                    <span className="meta-value">
                      {new Date(project.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Duration:</span>
                    <span className="meta-value">
                      {Math.ceil((new Date(project.completedAt) - new Date(project.submittedAt)) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>
              <div className="completed-badge">
                <span>✓ Completed</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cta-section">
        <h2>Ready to start your project?</h2>
        <p>Join our satisfied clients and let's bring your ideas to life!</p>
        <a href="/submit-project" className="cta-button">Start Your Project</a>
      </div>
    </div>
  );
};

export default Portfolio;