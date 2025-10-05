
const User = require('../models/User');

// controller function to handle liking a post
exports.likeUnlikePost = async (req, res) => {
    try {
        const { postId, userId } = req.params;
        // find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        // check if the post is already liked by the user
        if (user.likedPosts.includes(postId)) {
            // unlike the post if already liked
            user.likedPosts.pull(postId);
            await user.save();
            return res.status(200).json({
                success: true,
                message: 'Post unliked successfully',
                data: postId,
            });
        }
        // add the postId to the user's likedPosts array
        user.likedPosts.push(postId);
        await user.save();
        // send a success response
        res.status(200).json({
            success: true,
            message: 'Post liked successfully',
            data: postId,
        });
    } catch (error) {
        // handle errors and send an error response
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};
