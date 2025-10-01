const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const authMiddleware = require('../middleware/auth'); // Import auth middleware
const Project = require('../models/Project');
const User = require('../models/User');
require('dotenv').config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @route   POST api/projects
// @desc    Submit a new project
// @access  Private (requires token)
router.post('/', authMiddleware, async (req, res) => {
  const { projectTitle, projectDetails, deadline } = req.body;

  try {
    // Get user info from the database using the ID from the auth token
    const user = await User.findById(req.user.id).select('-password');

    // Create a new project instance
    const newProject = new Project({
      name: user.name,
      email: user.email,
      projectTitle,
      projectDetails,
      deadline,
    });

    const project = await newProject.save();

    // Send email notification to yourself
    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.MY_EMAIL,
      subject: `New Project Submission: ${project.projectTitle}`,
      html: `
        <h1>New Project Inquiry</h1>
        <p>A new project has been submitted by a registered user.</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Project:</strong> ${project.projectTitle}</p>
        <p><strong>Details:</strong> ${project.projectDetails}</p>
        <p><strong>Deadline:</strong> ${new Date(project.deadline).toLocaleDateString()}</p>
      `,
    };

    await transporter.sendMail(mailToOwner);

    res.json({ msg: 'Project submitted successfully! We will contact you shortly.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
