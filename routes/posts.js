const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/posts');
const auth = require('../middleware/auth');

// Post routes
router.post('/', auth, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
