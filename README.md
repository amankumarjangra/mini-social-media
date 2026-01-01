# 🌟 Mini Social Media Post System

A full-stack mini social media application where users can create posts with images and captions, view all posts in a feed, and add comments. Built with modern web technologies and deployed on free hosting platforms.

## ✨ Features

- 📸 **Image Upload**: Upload images (JPG, PNG) with posts
- ✍️ **Captions**: Add captions to your posts
- 🔥 **Post Feed**: View all posts in a beautiful, responsive feed
- 💬 **Comments**: Add and view comments on any post
- ⚡ **Real-time Updates**: Instant feedback and updates
- 🎨 **Modern UI**: Glassmorphism design with smooth animations
- 📱 **Responsive**: Works perfectly on mobile, tablet, and desktop

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](#) *(URL to be added after deployment)*
- **Backend API**: [Deployed on Render](#) *(URL to be added after deployment)*

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
- **UUID** - Unique ID generation

### Storage
- **In-Memory** - Simple array-based storage (data resets on server restart)

## 📁 Project Structure

```
Assignment/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   ├── .env.example       # Environment variables template
│   ├── .gitignore        # Git ignore rules
│   └── uploads/          # Uploaded images directory (auto-created)
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
└── README.md                   # This file
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

3. **Create environment file** (optional)
   ```bash
   cp .env.example .env
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Server will run on `http://localhost:5000`

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

### Backend Deployment (Render)

1. **Create account** on [Render.com](https://render.com)
2. **New Web Service** → Connect your Git repository
3. **Configure:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. **Deploy** and copy the service URL

### Frontend Deployment (Vercel)

1. **Create account** on [Vercel.com](https://vercel.com)
2. **Import Project** → Select your repository
3. **Configure:**
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Environment Variables**: 
     - `VITE_API_URL` = Your Render backend URL
4. **Deploy**

### Post-Deployment

1. Update frontend `.env` with production backend URL
2. Test all features on live URLs
3. Update this README with live URLs

## 🎨 Design Features

- **Dark Theme**: Premium dark color palette
- **Glassmorphism**: Frosted glass effects
- **Vibrant Gradients**: Eye-catching color transitions
- **Smooth Animations**: Micro-interactions for better UX
- **Responsive Layout**: Mobile-first design approach
- **Modern Typography**: Inter font family
- **Accessibility**: Proper ARIA labels and focus states

## 🔒 Limitations

- **In-Memory Storage**: All data is lost when the backend server restarts
- **No Authentication**: Anyone can create posts and comments
- **File Storage**: Images stored locally on server filesystem
- **No Pagination**: All posts loaded at once

## 🚀 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and profiles
- Image optimization and cloud storage (Cloudinary/S3)
- Pagination and infinite scroll
- Like/reaction system
- Post deletion and editing
- Image filters and cropping

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Developer

Built with ❤️ by a Senior Software Engineer with 10+ years of experience.

---

**Note**: This is a demo project for educational purposes. For production use, implement proper authentication, database, and security measures.
