# 🌟 Mini Social Media Post System

A full-stack mini social media application where users can create posts with images and captions, view all posts in a feed, and add comments. Built with modern web technologies and deployed on free hosting platforms.

## ✨ Features

- **Image Upload**: Upload images (JPG, PNG) with posts
-  **Captions**: Add captions to your posts
-  **Post Feed**: View all posts in a beautiful, responsive feed
-  **Comments**: Add and view comments on any post
-  **Real-time Updates**: Instant feedback and updates
-  **Modern UI**: Glassmorphism design with smooth animations
-  **Responsive**: Works perfectly on mobile, tablet, and desktop

## 🚀 Live Demo

- **Frontend**: https://mini-social-media-opal.vercel.app/
- **Backend API**: https://mini-social-media-1-4cj3.onrender.com  

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **Vanilla CSS** - Modern styling with CSS variables, gradients, and glassmorphism

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Multer** - File upload middleware
- **CORS** - Cross-Origin Resource Sharing
- **Mongoose** - MongoDB ODM (Object Data Modeling)

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB database with free tier

## 📁 Project Structure

```
Assignment/
├── backend/
│   ├── config/
│   │   └── db.js             # MongoDB connection configuration
│   ├── models/
│   │   └── Post.js           # Mongoose Post model with comments
│   ├── server.js             # Express server with API endpoints
│   ├── package.json          # Backend dependencies
│   ├── .env.example          # Environment variables template
│   ├── .gitignore           # Git ignore rules
│   └── uploads/             # Uploaded images directory (auto-created)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PostForm.jsx    # Post creation form
│   │   │   └── PostCard.jsx    # Post display card
│   │   ├── App.jsx             # Main application
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # Frontend dependencies
│   ├── .env.example            # Environment variables template
│   └── .gitignore             # Git ignore rules
│
├── README.md                         # This file
├── DEPLOYMENT_GUIDE.md              # Complete deployment instructions
└── DEPLOYMENT_QUICK_START.md        # Quick deployment reference
```

## 📋 API Endpoints

### 1. Create Post
```http
POST /api/posts
Content-Type: multipart/form-data

Body:
- image: File (JPG/PNG, max 5MB)
- caption: String (required)

Response: 201 Created
{
  "message": "Post created successfully",
  "post": {
    "id": "uuid",
    "image": "filename.jpg",
    "imageUrl": "http://domain/uploads/filename.jpg",
    "caption": "Post caption",
    "timestamp": "2026-01-01T12:30:00.000Z",
    "comments": []
  }
}
```

### 2. Get All Posts
```http
GET /api/posts

Response: 200 OK
{
  "message": "Posts retrieved successfully",
  "posts": [...],
  "total": 5
}
```

### 3. Add Comment to Post
```http
POST /api/posts/:id/comments
Content-Type: application/json

Body:
{
  "comment": "Your comment text"
}

Response: 201 Created
{
  "message": "Comment added successfully",
  "post": {
    "id": "uuid",
    "caption": "...",
    "comments": [...]
  }
}
```

## 🏃 Local Development Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB Atlas** (Free Cloud Database)
   
   a. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
   
   b. Create a new cluster:
      - Click "Build a Database"
      - Select "FREE" tier (M0 Sandbox)
      - Choose your preferred cloud provider and region
      - Click "Create Cluster"
   
   c. Create database user:
      - Go to "Database Access" in left sidebar
      - Click "Add New Database User"
      - Choose "Password" authentication
      - Set username and password (save these!)
      - Set user privileges to "Atlas Admin"
      - Click "Add User"
   
   d. Whitelist your IP:
      - Go to "Network Access" in left sidebar
      - Click "Add IP Address"
      - Click "Allow Access from Anywhere" (for development)
      - Click "Confirm"
   
   e. Get connection string:
      - Go to "Database" in left sidebar
      - Click "Connect" on your cluster
      - Select "Connect your application"
      - Copy the connection string
      - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and replace `MONGODB_URI` with your MongoDB Atlas connection string:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name (e.g., `mini-social-media`) after `.net/`
   
   Example:
   ```
   MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/mini-social-media?retryWrites=true&w=majority
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   
   You should see:
   ```
   ✅ MongoDB Connected: cluster0-shard-00-00.abc123.mongodb.net
   📊 Database Name: mini-social-media
   🚀 Server is running on port 5000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (optional for local dev)
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

### Testing Locally

1. Start the backend server (port 5000)
2. Start the frontend dev server (port 5173)
3. Open browser to `http://localhost:5173`
4. Create posts, add comments, and test functionality

## 🌐 Deployment Guide

**Detailed step-by-step deployment instructions available in:**
- 📚 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete guide with screenshots
- ⚡ **[DEPLOYMENT_QUICK_START.md](DEPLOYMENT_QUICK_START.md)** - Quick reference

### Quick Summary

#### Backend Deployment (Render)
1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set Root Directory: `backend`
4. Add environment variables (`MONGODB_URI`, `PORT`)
5. Deploy

#### Frontend Deployment (Vercel)
1. Connect GitHub repo to Vercel
2. Set Root Directory: `frontend`
3. Add environment variable (`VITE_API_URL`)
4. Deploy

**See deployment guides for detailed instructions!**

## 🎨 Design Features

- **Dark Theme**: Premium dark color palette
- **Glassmorphism**: Frosted glass effects
- **Vibrant Gradients**: Eye-catching color transitions
- **Smooth Animations**: Micro-interactions for better UX
- **Responsive Layout**: Mobile-first design approach
- **Modern Typography**: Inter font family
- **Accessibility**: Proper ARIA labels and focus states

## 🔒 Limitations

- **No Authentication**: Anyone can create posts and comments
- **Basic File Storage**: Images stored locally on server filesystem
- **No Pagination**: All posts loaded at once

## 🚀 Future Enhancements

- User authentication and profiles
- Image optimization and cloud storage (Cloudinary/S3)
- Pagination and infinite scroll
- Like/reaction system
- Post deletion and editing
- Image filters and cropping
- Real-time updates with WebSockets

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Developer

Built with ❤️ by a Senior Software Engineer with 10+ years of experience.

---

**Note**: This is a demo project for educational purposes. For production use, implement proper authentication, database, and security measures.
