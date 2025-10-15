const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyName: { type: String },
  projectTitle: { type: String, required: true },
  projectDetails: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'approved', 'completed'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
  approvedAt: { type: Date },
  completedAt: { type: Date },
  imageUrls: [{ type: String }],
  techStack: [{ type: String }], 
  videoUrl: { type: String }, 

});

module.exports = mongoose.model('Project', ProjectSchema);