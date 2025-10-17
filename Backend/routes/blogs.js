const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const slugify = require('slugify');

// GET all PUBLISHED blog posts (for public viewing)
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all posts, including drafts (for admin)
router.get('/all', async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single post by its slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new blog post
router.post('/', async (req, res) => {
  const { title, content, excerpt, imageUrl, category, status } = req.body;
  if (!title || !content || !excerpt || !imageUrl) {
    return res.status(400).json({ error: 'Title, content, excerpt, and image URL are required.' });
  }
  try {
    const newPost = new Blog({
      title,
      slug: slugify(title, { lower: true, strict: true }),
      content,
      excerpt,
      imageUrl,
      category,
      status,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'A post with this title already exists.' });
    }
    res.status(500).json({ error: 'Server error while creating post.' });
  }
});

// PUT (update) a blog post
router.put('/:id', async (req, res) => {
  const { title, content, excerpt, imageUrl, category, status } = req.body;
  try {
    const updateData = { title, content, excerpt, imageUrl, category, status };
    if (title) {
      updateData.slug = slugify(title, { lower: true, strict: true });
    }
    const updatedPost = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Server error while updating post.' });
  }
});

// DELETE a blog post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;