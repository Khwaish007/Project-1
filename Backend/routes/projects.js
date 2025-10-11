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

  
// ROUTE 4: Update project status or delete if declined
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Handle Decline (Delete) Action
    if (status === 'declined') {
      if (project.status !== 'pending') {
        return res.status(400).json({ error: 'Only pending projects can be declined.' });
      }
      await Project.findByIdAndDelete(id);
      return res.json({ message: 'Project declined and removed successfully.' });
    }

    // Enforce State Transition Rules
    const allowedTransitions = {
      pending: ['approved'],
      approved: ['completed'],
    };

    if (!allowedTransitions[project.status] || !allowedTransitions[project.status].includes(status)) {
      return res.status(400).json({ error: `Cannot transition from ${project.status} to ${status}.` });
    }

    // Update Status
    const updateData = { status };
    if (status === 'approved') {
      updateData.approvedAt = new Date();
    } else if (status === 'completed') {
      updateData.completedAt = new Date();
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({ message: 'Project status updated successfully', project: updatedProject });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating status.' });
  }
});

module.exports = router;