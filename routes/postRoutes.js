const router = require('express').Router();
const postController = require('../controllers/postController');

// Define routes and their handlers
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// Export the router
module.exports = router;
