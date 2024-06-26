const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Add comment
exports.addComment = async (req, res) => {
    const { content } = req.body;
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        const newComment = new Comment({
            content,
            user: req.user.id,
            post: req.params.postId
        });
        const comment = await newComment.save();
        post.comments.unshift(comment);
        await post.save();
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete comment
exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await comment.remove();
        post.comments = post.comments.filter(comment => comment.id !== req.params.commentId);
        await post.save();
        res.json({ msg: 'Comment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
