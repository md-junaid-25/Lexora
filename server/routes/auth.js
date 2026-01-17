import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    // 1. Check if user already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 3. Create user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    
    // 4. Save user
    const savedUser = await user.save();
    res.send({ user: savedUser._id });

  } catch (err) {
    // FIX: Send a simple string message on error
    res.status(400).send(err.message || 'Registration failed');
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    // 1. Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email not found');

    // 2. Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // 3. Create Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    
    // 4. Return token and user info
    res.header('auth-token', token).send({ 
        token, 
        user: { 
            id: user._id, 
            name: user.name, 
            email: user.email, 
            bio: user.bio, 
            avatar: user.avatar 
        } 
    });

  } catch (err) {
    // FIX: Send a simple string message on error
    res.status(400).send(err.message || 'Login failed');
  }
});

export default router;