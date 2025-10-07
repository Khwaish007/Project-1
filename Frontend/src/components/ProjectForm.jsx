import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectTitle: '',
    projectDetails: '',
    deadline: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5001/api/projects', formData);
      setMessage(res.data.message);
      setFormData({ name: '', email: '', projectTitle: '', projectDetails: '', deadline: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit project. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Your Project Details</h2>
      <p>Once you submit, we'll review the details and get back to you via email.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="projectTitle" 
          placeholder="Project Title" 
          value={formData.projectTitle} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="projectDetails" 
          placeholder="Describe your project..." 
          value={formData.projectDetails} 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="deadline">Preferred Deadline:</label>
        <input 
          type="date" 
          name="deadline" 
          id="deadline" 
          value={formData.deadline} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Submit Project</button>
      </form>
      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
};

export default ProjectForm;