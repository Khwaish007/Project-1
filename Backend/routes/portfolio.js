const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const PortfolioProject = require('../models/PortfolioProject');
const User = require('../models/User');

// @route   POST api/portfolio
// @desc    Add a new portfolio project
// @access  Private (for admin/owner only)
router.post('/', authMiddleware, async (req, res) => {
  // Optional: Add a check to ensure only you can add projects
  // For simplicity, we assume any logged-in user is the owner.
  // In a real app, you'd check req.user.id against your specific admin ID.

  const { title, description, imageUrl, projectUrl, tags } = req.body;

  try {
    const newPortfolioProject = new PortfolioProject({
      title,
      description,
      imageUrl,
      projectUrl,
      tags,
    });

    const project = await newPortfolioProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/portfolio
// @desc    Get all portfolio projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await PortfolioProject.find().sort({ dateAdded: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
