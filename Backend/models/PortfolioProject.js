const mongoose = require('mongoose');

const PortfolioProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false, // Optional image for the project
  },
  projectUrl: {
    type: String,
    required: false, // Optional link to the live project
  },
  tags: {
    type: [String],
    default: [],
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PortfolioProject', PortfolioProjectSchema);
