const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// Email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-jwt-secret', { expiresIn: '7d' });
};

// Signup
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../register.html'));
});

router.post('/signup', [
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 }),
    check('firstName').notEmpty(),
    check('lastName').notEmpty()
], async (req, res) => {
    console.log('Signup request received:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    console.log('Validation passed');

    const { email, password, firstName, lastName } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            email,
            password,
            firstName,
            lastName,
            isVerified: true
        });

        console.log('About to save user for email:', email);
        await user.save();
        console.log('User saved successfully');

        const token = generateToken(user);
        res.json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify email
router.get('/verify/:token', async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });
        if (!user) {
            return res.redirect('/verify.html?error=invalid_token');
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        req.login(user, (err) => {
            if (err) {
                return res.redirect('/verify.html?error=login_failed');
            }
            res.redirect('/verify.html?success=true');
        });
    } catch (err) {
        res.redirect('/verify.html?error=server_error');
    }
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
    const token = generateToken(req.user);
    res.json({
        message: 'Logged in successfully',
        token,
        user: {
            id: req.user._id,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        }
    });
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
});

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
});

// Dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../dashboard.html'));
});

// Logout (client-side token clear, but provide endpoint for consistency)
router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Password reset request
router.post('/forgot-password', [
    check('email').isEmail().normalizeEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'No user with that email' });
        }

        // Generate reset token
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Password Reset - D.Solution',
            html: `
                <h1>Reset Your Password</h1>
                <p>Click the link below to reset your password:</p>
                <a href="${process.env.BASE_URL}/api/auth/reset-password/${token}">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Password reset email sent' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Reset password
router.get('/reset/:token', async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.redirect('/reset.html?error=invalid_token');
        }

        res.render('reset', { token: req.params.token });
    } catch (err) {
        res.redirect('/reset.html?error=server_error');
    }
});

router.post('/reset-password/:token', [
    check('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).redirect(`/reset/${req.params.token}?error=validation`);
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).redirect('/reset.html?error=invalid_token');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.redirect('/login.html?success=password_reset');
    } catch (err) {
        res.status(500).redirect('/reset.html?error=server_error');
    }
});

// Profile update
router.put('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, email },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;