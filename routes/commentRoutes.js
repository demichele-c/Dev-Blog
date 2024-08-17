const router = require('express').Router();
const commentController = require('../controllers/commentController');

// Define routes and their handlers
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

// Export the router
module.exports = router;
