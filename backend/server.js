import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import connectDB from './config/db.js';
import Post from './models/Post.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files (uploaded images)
app.use('/uploads', express.static(uploadsDir));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Connect to MongoDB
connectDB();

// Helper function to get full image URL
const getImageUrl = (filename, req) => {
  return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
};

// API Routes

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Mini Social Media API',
    version: '1.0.0',
    endpoints: {
      createPost: 'POST /api/posts',
      getPosts: 'GET /api/posts',
      addComment: 'POST /api/posts/:id/comments'
    }
  });
});

// 1. Create Post
app.post('/api/posts', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    if (!req.body.caption) {
      return res.status(400).json({ error: 'Caption is required' });
    }

    // Create new post in MongoDB
    const newPost = await Post.create({
      image: req.file.filename,
      caption: req.body.caption
    });

    // Convert to JSON and add imageUrl
    const postResponse = newPost.toJSON();
    postResponse.imageUrl = getImageUrl(newPost.image, req);

    res.status(201).json({
      message: 'Post created successfully',
      post: postResponse
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// 2. Get All Posts
app.get('/api/posts', async (req, res) => {
  try {
    // Fetch all posts from MongoDB, sorted by newest first
    const posts = await Post.find().sort({ createdAt: -1 });

    // Add imageUrl to each post
    const postsWithUrls = posts.map(post => {
      const postObj = post.toJSON();
      postObj.imageUrl = getImageUrl(post.image, req);
      return postObj;
    });

    res.json({
      message: 'Posts retrieved successfully',
      posts: postsWithUrls,
      total: postsWithUrls.length
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// 3. Add Comment to Post
app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment || comment.trim() === '') {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    // Find post by MongoDB _id and add comment
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Add comment to the post
    post.comments.push({
      text: comment,
      timestamp: new Date()
    });

    // Save the updated post
    await post.save();

    // Convert to JSON and add imageUrl
    const postResponse = post.toJSON();
    postResponse.imageUrl = getImageUrl(post.image, req);

    res.status(201).json({
      message: 'Comment added successfully',
      post: postResponse
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid post ID format' });
    }
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err) {
    return res.status(400).json({ error: err.message });
  }

  next();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`\n📌 API Endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/posts`);
  console.log(`   GET  http://localhost:${PORT}/api/posts`);
  console.log(`   POST http://localhost:${PORT}/api/posts/:id/comments`);
});
