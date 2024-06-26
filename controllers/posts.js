const Post = require('../models/Post');

// Create a post
exports.createPost = async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const newPost = new Post({
            user: req.user.id,
            title,
            content,
            tags
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', ['name', 'avatar']);
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', ['name', 'avatar']);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
};

// Update post
exports.updatePost = async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        post.title = title || post.title;
        post.content = content || post.content;
        post.tags = tags || post.tags;
        post = await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
9. Comment Routes and Controllers (routes/comments.js and controllers/comments.js)
routes/comments.js
js
Copy code
const express = require('express');
const router = express.Router();
const { addComment, deleteComment } = require('../controllers/comments');
const auth = require('../middleware/auth');

// Comment routes
router.post('/:postId', auth, addComment);
router.delete('/:postId/:commentId', auth, deleteComment);

module.exports = router;
