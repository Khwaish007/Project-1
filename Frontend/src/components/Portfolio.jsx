import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/portfolio');
        setProjects(res.data);
      } catch (err) {
        setError('Could not fetch portfolio projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading portfolio...</p>;
  if (error) return <p className="message error">{error}</p>;

  return (
    <div className="portfolio-container">
      <h2>My Past Work</h2>
      <div className="portfolio-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="portfolio-card">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  onError={(e) => {
                    // Fallback in case image link is broken
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project.projectUrl && (
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No projects to display yet.</p>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
