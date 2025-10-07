import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectManager.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_PASSWORD = 'admin123'; // Change this to your preferred password

  useEffect(() => {
    // Check if already authenticated in this session
    if (sessionStorage.getItem('adminAccess') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedStatus]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAccess', 'true');
      setError('');
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAccess');
    setPassword('');
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/projects');
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
    }
  };

  const filterProjects = () => {
    if (selectedStatus === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.status === selectedStatus));
    }
  };

  const updateProjectStatus = async (projectId, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/api/projects/${projectId}/status`, {
        status: newStatus
      });
      
      // Update local state
      setProjects(projects.map(project => 
        project._id === projectId 
          ? { ...project, status: newStatus }
          : project
      ));
    } catch (err) {
      setError('Failed to update project status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'approved': return '#3498db';
      case 'completed': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  const getStatusCount = (status) => {
    return projects.filter(project => project.status === status).length;
  };

  // If not authenticated, show password form
  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <div className="auth-icon">🔒</div>
          <h2>Admin Access Required</h2>
          <p>Please enter the admin password to manage projects</p>
          <form onSubmit={handlePasswordSubmit}>
            <div className="password-input">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type="submit" className="auth-button">
              Access Dashboard
            </button>
          </form>
          {error && <div className="auth-error">{error}</div>}
          <div className="auth-note">
            <small>This area is restricted to administrators only</small>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="project-manager">
      <div className="manager-header">
        <div className="header-top">
          <h1>Project Manager Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
        <div className="status-summary">
          <div className="status-card">
            <span className="count">{getStatusCount('pending')}</span>
            <span className="label">Pending</span>
          </div>
          <div className="status-card">
            <span className="count">{getStatusCount('approved')}</span>
            <span className="label">Approved</span>
          </div>
          <div className="status-card">
            <span className="count">{getStatusCount('completed')}</span>
            <span className="label">Completed</span>
          </div>
          <div className="status-card">
            <span className="count">{projects.length}</span>
            <span className="label">Total</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select 
          id="status-filter"
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Projects ({projects.length})</option>
          <option value="pending">Pending ({getStatusCount('pending')})</option>
          <option value="approved">Approved ({getStatusCount('approved')})</option>
          <option value="completed">Completed ({getStatusCount('completed')})</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            <h3>No projects found</h3>
            <p>No projects match the selected status filter.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-header">
                <h3>{project.projectTitle}</h3>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(project.status) }}
                >
                  {project.status.toUpperCase()}
                </span>
              </div>
              
              <div className="project-details">
                <p><strong>Client:</strong> {project.name}</p>
                <p><strong>Email:</strong> {project.email}</p>
                <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                <p><strong>Submitted:</strong> {new Date(project.submittedAt).toLocaleDateString()}</p>
                <p><strong>Details:</strong> {project.projectDetails}</p>
              </div>

              <div className="project-actions">
                <h4>Update Status:</h4>
                <div className="action-buttons">
                  {project.status !== 'pending' && (
                    <button 
                      onClick={() => updateProjectStatus(project._id, 'pending')}
                      className="btn-pending"
                    >
                      ⏳ Pending
                    </button>
                  )}
                  {project.status !== 'approved' && (
                    <button 
                      onClick={() => updateProjectStatus(project._id, 'approved')}
                      className="btn-approved"
                    >
                      ✅ Approve
                    </button>
                  )}
                  {project.status !== 'completed' && (
                    <button 
                      onClick={() => updateProjectStatus(project._id, 'completed')}
                      className="btn-completed"
                    >
                      🎉 Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectManager;