import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPortfolioProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    tags: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in.');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    // Convert comma-separated tags string to an array
    const projectData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      await axios.post('http://localhost:5001/api/portfolio', projectData, config);
      setMessage('Project added successfully!');
      setFormData({ title: '', description: '', imageUrl: '', projectUrl: '', tags: '' });
      // Optional: redirect after successful submission
      // navigate('/portfolio'); 
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add project.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Portfolio Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Project Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL (optional)" value={formData.imageUrl} onChange={handleChange} />
        <input type="text" name="projectUrl" placeholder="Live Project URL (optional)" value={formData.projectUrl} onChange={handleChange} />
        <input type="text" name="tags" placeholder="Tags (comma-separated, e.g., React, Node.js)" value={formData.tags} onChange={handleChange} />
        <button type="submit">Add Project</button>
      </form>
      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
};

export default AddPortfolioProject;
