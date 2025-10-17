const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true }, // Will store HTML from the rich text editor
    excerpt: { type: String, required: true, maxlength: 300 },
    imageUrl: { type: String, required: true },
    category: { type: String, default: 'General' },
    author: { type: String, default: 'Khwaish Garg' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);