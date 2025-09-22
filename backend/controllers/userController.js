import User from '../models/User.js';
import Product from '../models/Product.js';
import Dish from '../models/Dish.js';
import { validationResult } from 'express-validator';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'login nickname email role_id is_online last_activity createdAt')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error getting users' });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { role_id } = req.body;
    const userId = req.params.id;

    if (userId === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot change your own role' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role_id },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User role updated successfully',
      user: {
        id: user._id,
        login: user.login,
        nickname: user.nickname,
        role_id: user.role_id
      }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Server error updating user role' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (userId === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    // Delete user and all related data
    await Promise.all([
      User.findByIdAndDelete(userId),
      Product.deleteMany({ user_id: userId }),
      Dish.deleteMany({ user_id: userId })
    ]);

    res.json({ message: 'User and all related data deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error deleting user' });
  }
};
