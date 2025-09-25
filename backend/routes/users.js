import express from 'express';
import { body } from 'express-validator';
import { getUsers, updateUserRole, deleteUser } from '../controllers/userController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken, requireAdmin);

const roleValidation = [
  body('role_id')
    .isInt({ min: 0, max: 2 })
    .withMessage('Role ID must be 0 (Admin), 1 (User), or 2 (Guest)')
];

router.get('/', getUsers);
router.put('/:id/role', roleValidation, updateUserRole);
router.delete('/:id', deleteUser);

export { router as userRoutes };
