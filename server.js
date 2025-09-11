const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const MongoStore = require('connect-mongo');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Log env vars loaded (without secrets)
console.log('Environment loaded. MONGODB_URI present:', !!process.env.MONGODB_URI);
console.log('SESSION_SECRET present:', !!process.env.SESSION_SECRET);
console.log('JWT_SECRET present:', !!process.env.JWT_SECRET);
console.log('EMAIL_USER present:', !!process.env.EMAIL_USER);
console.log('GOOGLE_CLIENT_ID present:', !!process.env.GOOGLE_CLIENT_ID);
console.log('FACEBOOK_APP_ID present:', !!process.env.FACEBOOK_APP_ID);

// Handle uncaught exceptions
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/dsolution',
        collectionName: 'sessions'
    }),
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.use(express.static('public'));
app.use(express.static('.'));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dsolution', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
    console.error('Connection string used:', process.env.MONGODB_URI ? 'Set (Atlas)' : 'Local fallback');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// User Model
const User = require('./models/User');
console.log('User model loaded');

// Passport Configuration
require('./config/passport');
console.log('Passport configured');

// Routes
app.use('/api/auth', require('./routes/auth'));
console.log('Auth routes mounted');

// Protected routes
app.get('/api/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('Dashboard access attempted by user:', req.user ? req.user.email : 'unauthenticated');
    res.json({ message: 'Welcome to your dashboard', user: req.user });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Server ready for testing without DB');
});

module.exports = app;