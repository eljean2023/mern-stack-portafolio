const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const multer = require('multer');
const jwt = require('jsonwebtoken');

// Setup Multer for avatar
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname)
});
const upload = multer({ storage });

// Get authenticated user (current path)
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Edit authenticated user profile (current path)
router.put('/me', auth, upload.single('avatar'), async (req, res) => {
  const updates = { name: req.body.name };
  if (req.file) updates.avatar = `/uploads/${req.file.filename}`;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
  res.json(user);
});


// NEW ROUTE: Get profile with JWT directly from header
router.get('/profile', async (req, res) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: 'Token required' });

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    return res.status(403).json({ msg: 'Invalid token' });
  }
});

// Delete user (protected)
router.delete('/me', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;

