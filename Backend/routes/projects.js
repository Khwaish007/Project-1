const express = require('express');
const Project = require('../models/Project');
const nodemailer = require('nodemailer');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ROUTE 1: Submit a new project
router.post('/', upload.single('additionalFile'), async (req, res) => {
  try {
    // Destructure text fields from the multipart form body
    const {
      name, email, phoneNumber, companyName, projectTitle,
      projectDetails, startDate, endDate, budget
    } = req.body;

    // Image URLs are sent as a JSON string, so we need to parse them
    const imageUrls = JSON.parse(req.body.imageUrls || '[]');

    // Create a new project instance with the parsed data
    const project = new Project({
      name, email, phoneNumber, companyName, projectTitle,
      projectDetails, startDate, endDate, budget, imageUrls
    });
    
    await project.save();

    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.MY_EMAIL,
      subject: `New Project Submission: ${project.projectTitle}`,
      html: `
        <div style="background-color: #f0f2f5; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 40px;">
            
            <h1 style="font-size: 24px; color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 0;">
              New Project Submission
            </h1>
            
            <p style="font-size: 16px; color: #555;">You have received a new project inquiry for <strong>${project.projectTitle}</strong>.</p>

            <h2 style="font-size: 20px; color: #333; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
              Client Details
            </h2>
            <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Name:</strong> ${project.name}</p>
            <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${project.email}" style="color: #1a73e8;">${project.email}</a></p>
            <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Phone:</strong> ${project.phoneNumber}</p>
            ${project.companyName ? `<p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Company:</strong> ${project.companyName}</p>` : ''}

            <h2 style="font-size: 20px; color: #333; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
              Project Details
            </h2>
            <div style="background-color: #f9f9f9; border-left: 4px solid #4a90e2; padding: 15px; margin-top: 15px;">
              <h3 style="font-size: 18px; color: #333; margin-top: 0;">${project.projectTitle}</h3>
              <p style="font-size: 16px; color: #555; margin-bottom: 0;">${project.projectDetails}</p>
            </div>
            ${project.budget ? `<p style="font-size: 16px; color: #555; margin-top: 20px;"><strong>Budget:</strong> ${project.budget}</p>` : ''}
            <p style="font-size: 16px; color: #555; margin-top: 20px;"><strong>Timeline:</strong> ${new Date(project.startDate).toLocaleDateString()} to ${new Date(project.endDate).toLocaleDateString()}</p>

            <p style="text-align: center; font-size: 14px; color: #777; margin-top: 40px;">
              You can review and manage this project in your admin dashboard.
            </p>

          </div>
          <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">This is an automated notification from your portfolio website.</p>
        </div>
      `,
      attachments: [] // Initialize attachments array
    };

    // If a file was uploaded, add it to the attachments
    if (req.file) {
      mailToOwner.attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      });
    }

    await transporter.sendMail(mailToOwner);

    res.status(201).json({ message: 'Project submitted successfully!' });
  } catch (error) {
    console.error("Error submitting project:", error);
    res.status(500).json({ error: 'Server error while processing your request.' });
  }
});

// ROUTE 2: Get completed projects (PUBLIC - for portfolio)
router.get('/completed', async (req, res) => {
  try {
    const completedProjects = await Project.find({ status: 'completed' })
      .select('name projectTitle projectDetails submittedAt completedAt imageUrls techStack videoUrl startDate endDate')
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
  const { status, imageUrls, techStack, videoUrl } = req.body;
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

    if (videoUrl !== undefined) {
      updateData.videoUrl = videoUrl;
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