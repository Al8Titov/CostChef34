import express from 'express';
import { body } from 'express-validator';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

const productValidation = [
  body('name')
    .notEmpty()
    .withMessage('Название продукта обязательно')
    .trim(),
  body('category_id')
    .isInt({ min: 1, max: 10 })
    .withMessage('ID категории должен быть от 1 до 10'),
  body('category_name')
    .notEmpty()
    .withMessage('Название категории обязательно'),
  body('quantity')
    .isFloat({ min: 0 })
    .withMessage('Количество должно быть положительным числом'),
  body('unit')
    .isIn(['kg', 'l', 'шт'])
    .withMessage('Единица измерения должна быть kg, l или шт'),
  body('total_price')
    .isFloat({ min: 0 })
    .withMessage('Общая цена должна быть положительным числом'),
  body('price_per_unit')
    .isFloat({ min: 0 })
    .withMessage('Цена за единицу должна быть положительным числом')
];

router.get('/', getProducts);
router.post('/', productValidation, createProduct);
router.put('/:id', productValidation, updateProduct);
router.delete('/:id', deleteProduct);

export { router as productRoutes };
