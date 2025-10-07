const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  projectTitle: { type: String, required: true },
  projectDetails: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'approved', 'completed'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
  approvedAt: { type: Date },
  completedAt: { type: Date },
});

module.exports = mongoose.model('Project', ProjectSchema);