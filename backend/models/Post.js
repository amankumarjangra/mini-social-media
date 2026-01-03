import mongoose from 'mongoose';

/**
 * Post Schema
 * Represents a social media post with image, caption, and comments
 */
const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Comment text is required'],
        trim: true,
        maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    _id: true // Each comment gets its own _id
});

const PostSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Image filename is required'],
        trim: true
    },
    caption: {
        type: String,
        required: [true, 'Caption is required'],
        trim: true,
        maxlength: [2000, 'Caption cannot exceed 2000 characters']
    },
    comments: {
        type: [CommentSchema],
        default: []
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            // Convert _id to id for consistency with frontend
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;

            // Transform comment IDs as well
            if (ret.comments && ret.comments.length > 0) {
                ret.comments = ret.comments.map(comment => {
                    const commentObj = comment.toObject ? comment.toObject() : comment;
                    return {
                        id: commentObj._id.toString(),
                        text: commentObj.text,
                        timestamp: commentObj.timestamp
                    };
                });
            }

            return ret;
        }
    },
    toObject: {
        virtuals: true
    }
});

// Indexes for better query performance
PostSchema.index({ createdAt: -1 }); // For sorting posts by newest first

// Virtual for timestamp (for backward compatibility)
PostSchema.virtual('timestamp').get(function () {
    return this.createdAt;
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
