import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function PostCard({ post, onCommentAdded }) {
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            setError('Please enter a comment');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}/api/posts/${post.id}/comments`, {
                comment: comment.trim()
            });

            setComment('');

            // Notify parent component
            if (onCommentAdded) {
                onCommentAdded(post.id, response.data.post);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add comment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card post-card">
            <div className="post-image-wrapper">
                <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="post-image"
                    loading="lazy"
                />
            </div>

            <div className="post-content">
                <p className="post-caption">{post.caption}</p>

                <div className="post-meta">
                    <span className="meta-icon">🕐</span>
                    <span>{formatDate(post.timestamp)}</span>
                    <span style={{ margin: '0 0.5rem' }}>•</span>
                    <span className="meta-icon">💬</span>
                    <span>{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</span>
                </div>

                {/* Comments Section */}
                <div className="comments-section">
                    <h3 className="comments-title">
                        💭 Comments ({post.comments.length})
                    </h3>

                    {post.comments.length > 0 && (
                        <div className="comments-list">
                            {post.comments.map((commentItem) => (
                                <div key={commentItem.id} className="comment-item">
                                    <p className="comment-text">{commentItem.text}</p>
                                    <span className="comment-time">{formatDate(commentItem.timestamp)}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add Comment Form */}
                    <form onSubmit={handleAddComment} className="add-comment-form">
                        <input
                            type="text"
                            className="text-input comment-input"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            maxLength={200}
                        />
                        <button
                            type="submit"
                            className="btn btn-secondary btn-comment"
                            disabled={loading || !comment.trim()}
                        >
                            {loading ? '...' : '💬 Comment'}
                        </button>
                    </form>

                    {error && (
                        <div className="error-message" style={{ marginTop: '0.5rem', padding: '0.5rem', fontSize: '0.85rem' }}>
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostCard;
