import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function PostForm({ onPostCreated }) {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
                setError('Only JPG, JPEG, and PNG files are allowed');
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setError('');
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!image) {
            setError('Please select an image');
            return;
        }

        if (!caption.trim()) {
            setError('Please enter a caption');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('caption', caption);

            const response = await axios.post(`${API_URL}/api/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Post created successfully! 🎉');
            setCaption('');
            setImage(null);
            setImagePreview(null);

            // Notify parent component
            if (onPostCreated) {
                onPostCreated(response.data.post);
            }

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card post-form">
            <h2 className="form-title" style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
                ✨ Create New Post
            </h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="image-upload" className="form-label">
                        📸 Upload Image
                    </label>
                    <div className="file-upload-wrapper">
                        <input
                            type="file"
                            id="image-upload"
                            className="file-input"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handleImageChange}
                        />
                        <div className={`file-upload-button ${image ? 'has-file' : ''}`}>
                            {image ? (
                                <>
                                    <span>✓</span>
                                    <span>{image.name}</span>
                                </>
                            ) : (
                                <>
                                    <span>📁</span>
                                    <span>Choose an image (JPG, PNG)</span>
                                </>
                            )}
                        </div>
                    </div>

                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" className="preview-image" />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="remove-image"
                                aria-label="Remove image"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="caption-input" className="form-label">
                        ✍️ Caption
                    </label>
                    <textarea
                        id="caption-input"
                        className="textarea"
                        placeholder="Share your thoughts..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        maxLength={500}
                    />
                    <div style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                        {caption.length}/500
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !image || !caption.trim()}
                    style={{ width: '100%' }}
                >
                    {loading ? (
                        <>
                            <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
                            <span>Creating...</span>
                        </>
                    ) : (
                        <>
                            <span>🚀</span>
                            <span>Create Post</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default PostForm;
