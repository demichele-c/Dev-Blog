const { Comment } = require('../models');
const express = require('express');
const router = express.Router();

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const newComment = await Comment.create({ post_id, content, user_id: req.session.user_id });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
