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
        ${project.phoneNumber ? `<p><strong>Phone:</strong> ${project.phoneNumber}</p>` : ''}
        ${project.companyName ? `<p><strong>Company:</strong> ${project.companyName}</p>` : ''}
        <p><strong>Project:</strong> ${project.projectTitle}</p>
        <p><strong>Details:</strong> ${project.projectDetails}</p>
        <p><strong>Start Date:</strong> ${new Date(project.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> ${new Date(project.endDate).toLocaleDateString()}</p>
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
      .select('name projectTitle projectDetails submittedAt completedAt imageUrls techStack')
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

  
// ROUTE 4: Update project status, images, or tech stack
router.put('/:id/status', async (req, res) => {
  const { status, imageUrls, techStack } = req.body;
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

    // Prepare update data
    const updateData = {};

    // Handle Status Transition
    if (status && status !== project.status) {
      const allowedTransitions = {
        pending: ['approved'],
        approved: ['completed'],
      };

      if (!allowedTransitions[project.status] || !allowedTransitions[project.status].includes(status)) {
        return res.status(400).json({ error: `Cannot transition from ${project.status} to ${status}.` });
      }
      
      updateData.status = status;
      if (status === 'approved') {
        updateData.approvedAt = new Date();
      } else if (status === 'completed') {
        updateData.completedAt = new Date();
      }
    }

    // Handle Image URLs update
    if (imageUrls && Array.isArray(imageUrls)) {
      updateData.imageUrls = imageUrls;
    }

    // Handle Tech Stack update
    if (techStack && Array.isArray(techStack)) {
      updateData.techStack = techStack;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided.' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating project.' });
  }
});

module.exports = router;