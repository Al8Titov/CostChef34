import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { login, password, nickname, email } = req.body;

    const existingUser = await User.findOne({ 
      $or: [{ login }, { email }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.login === login ? 'Login already taken' : 'Email already taken' 
      });
    }

    const user = new User({
      login,
      password,
      nickname,
      email,
      role_id: 1
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        login: user.login,
        nickname: user.nickname,
        email: user.email,
        role_id: user.role_id
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.is_online = true;
    user.last_activity = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        login: user.login,
        nickname: user.nickname,
        email: user.email,
        role_id: user.role_id
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.is_online = false;
      user.last_activity = new Date();
      await user.save();
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Server error during logout' });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        login: req.user.login,
        nickname: req.user.nickname,
        email: req.user.email,
        role_id: req.user.role_id
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error getting profile' });
  }
};
