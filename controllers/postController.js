const { Post } = require('../models');
const express = require('express');
const router = express.Router();

// ALL of these routes are PREFIXED with '/api/posts'

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content, user_id: req.session.user_id });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await Post.update({ title, content }, { where: { id } });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
