const router = require('express').Router();
const postController = require('../controllers/postController');

router.use('/posts', postController);

module.exports = router;
