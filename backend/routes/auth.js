import express from 'express';
import { body } from 'express-validator';
import { register, login, logout, getProfile } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('login')
    .isLength({ min: 3, max: 15 })
    .withMessage('Login must be between 3 and 15 characters')
    .matches(/^\w+$/)
    .withMessage('Login can only contain letters and numbers'),
  body('nickname')
    .isLength({ min: 2, max: 20 })
    .withMessage('Nickname must be between 2 and 20 characters')
    .matches(/^[a-zA-Zа-яА-Я0-9_]+$/)
    .withMessage('Nickname can only contain letters, numbers and underscore'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('login')
    .notEmpty()
    .withMessage('Login is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', authenticateToken, logout);
router.get('/profile', authenticateToken, getProfile);

export { router as authRoutes };
