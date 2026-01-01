import { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './components/PostForm';
import PostCard from './components/PostCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch posts on component mount
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/posts`);
            setPosts(response.data.posts || []);
            setError('');
        } catch (err) {
            setError('Failed to load posts. Please try again.');
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handleCommentAdded = (postId, updatedPost) => {
        setPosts(posts.map(post =>
            post.id === postId ? updatedPost : post
        ));
    };

    return (
        <div className="app">
            <div className="container">
                {/* Header */}
                <header className="app-header">
                    <h1 className="app-title">Mini Social Media</h1>
                    <p className="app-subtitle">Share your moments with the world 🌍</p>
                </header>

                {/* Post Creation Form */}
                <PostForm onPostCreated={handlePostCreated} />

                {/* Posts Feed */}
                <div className="posts-feed-section">
                    <div className="feed-header">
                        <h2 className="feed-title">🔥 Recent Posts</h2>
                        {posts.length > 0 && (
                            <div className="post-count">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</div>
                        )}
                    </div>

                    {loading && (
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="error-message">{error}</div>
                    )}

                    {!loading && !error && posts.length === 0 && (
                        <div className="glass-card empty-state">
                            <div className="empty-state-icon">📭</div>
                            <p className="empty-state-text">No posts yet</p>
                            <p className="empty-state-subtext">Be the first to share a moment!</p>
                        </div>
                    )}

                    {!loading && !error && posts.length > 0 && (
                        <div className="posts-feed">
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onCommentAdded={handleCommentAdded}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
