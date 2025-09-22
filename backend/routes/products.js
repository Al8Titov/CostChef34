import express from 'express';
import { body } from 'express-validator';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Validation rules
const productValidation = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .trim(),
  body('category_id')
    .isInt({ min: 1, max: 10 })
    .withMessage('Category ID must be between 1 and 10'),
  body('category_name')
    .notEmpty()
    .withMessage('Category name is required'),
  body('quantity')
    .isFloat({ min: 0 })
    .withMessage('Quantity must be a positive number'),
  body('unit')
    .isIn(['kg', 'l', 'шт'])
    .withMessage('Unit must be kg, l, or шт'),
  body('total_price')
    .isFloat({ min: 0 })
    .withMessage('Total price must be a positive number'),
  body('price_per_unit')
    .isFloat({ min: 0 })
    .withMessage('Price per unit must be a positive number')
];

// Routes
router.get('/', getProducts);
router.post('/', productValidation, createProduct);
router.put('/:id', productValidation, updateProduct);
router.delete('/:id', deleteProduct);

export { router as productRoutes };
