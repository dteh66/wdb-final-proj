// app.js
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const authRouter = require('auth');
const wishlistRouter = require('../src/backend/wishlist');

const app = express();
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure sessions
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Parse request body as JSON
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/wishlist', wishlistRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});