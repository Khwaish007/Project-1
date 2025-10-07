const express = require('express');
const Project = require('../models/Project');
const nodemailer = require('nodemailer');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ROUTE 1: Submit a new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();

    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.MY_EMAIL,
      subject: `New Project Submission: ${project.projectTitle}`,
      html: `
        <h1>New Project Inquiry</h1>
        <p><strong>Name:</strong> ${project.name}</p>
        <p><strong>Email:</strong> ${project.email}</p>
        <p><strong>Project:</strong> ${project.projectTitle}</p>
        <p><strong>Details:</strong> ${project.projectDetails}</p>
        <p><strong>Deadline:</strong> ${new Date(project.deadline).toLocaleDateString()}</p>
        <p>Visit your admin dashboard to approve.</p>
      `,
    };
    await transporter.sendMail(mailToOwner);

    res.status(201).json({ message: 'Project submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ROUTE 2: Get completed projects (PUBLIC - for portfolio)
router.get('/completed', async (req, res) => {
  try {
    const completedProjects = await Project.find({ status: 'completed' })
      .select('name projectTitle projectDetails submittedAt completedAt')
      .sort({ completedAt: -1 });
    res.json(completedProjects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ROUTE 3: Get all projects (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ submittedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ROUTE 4: Update project status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updateData = { status };
    
    if (status === 'approved') {
      updateData.approvedAt = new Date();
    } else if (status === 'completed') {
      updateData.completedAt = new Date();
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project status updated successfully', project });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;