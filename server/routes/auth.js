const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken, requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/signup
 * Creates a real account: hashes the password and stores the user.
 * This is what was missing before — signup now actually persists credentials.
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Basic input validation (Mongoose validates too, but fail fast here).
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'email, password and name are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Reject duplicate emails before hashing (the unique index also guards this).
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    // Hash with bcrypt. 12 rounds is a good cost for 2026 hardware.
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({ email, passwordHash, name, role });
    const token = signToken(user._id);

    // user.toJSON() strips the hash (see the model). Return token + safe user.
    res.status(201).json({ token, user: user.toJSON() });
  } catch (err) {
    // Duplicate-key race (two signups at once) surfaces as code 11000.
    if (err.code === 11000) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Could not create account' });
  }
});

/**
 * POST /api/auth/login
 * Looks up the user and compares the password against the stored hash.
 * A wrong password OR an unknown email both fail — this is what finally
 * closes "any credentials work".
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // Same generic message whether the email is unknown or the password is
    // wrong, so we don't reveal which emails are registered.
    const ok = user && (await user.verifyPassword(password));
    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken(user._id);
    res.json({ token, user: user.toJSON() });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Could not log in' });
  }
});

/**
 * GET /api/auth/me
 * Returns the current user, derived from the verified token. The frontend
 * uses this on load to confirm a stored token is still valid.
 */
router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user: user.toJSON() });
});

module.exports = router;
