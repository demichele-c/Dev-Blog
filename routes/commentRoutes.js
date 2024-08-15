const router = require('express').Router();
const commentController = require('../controllers/commentController');

router.use('/comments', commentController);

module.exports = router;
