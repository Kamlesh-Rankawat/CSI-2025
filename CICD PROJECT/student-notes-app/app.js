const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

let posts = []; // In-memory storage for posts

// Render the homepage with all posts
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Handle media upload
app.post('/upload', upload.single('media'), (req, res) => {
  const title = req.body.title;
  const file = req.file;

  if (file) {
    const post = {
      id: uuidv4(),
      title,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      likes: 0,
      comments: []
    };
    posts.unshift(post); // Add to start for latest-first
  }

  res.redirect('/');
});

// Handle like button
app.post('/like/:id', (req, res) => {
  const id = req.params.id;
  const post = posts.find(p => p.id === id);
  if (post) {
    post.likes++;
  }
  res.redirect('/');
});

// Handle comments
app.post('/comment/:id', (req, res) => {
  const id = req.params.id;
  const comment = req.body.comment;
  const post = posts.find(p => p.id === id);
  if (post && comment.trim() !== "") {
    post.comments.push(comment.trim());
  }
  res.redirect('/');
});

// Start server
app.listen(8080, '0.0.0.0', () => {
  console.log('✅ App running on http://0.0.0.0:8080');
});
