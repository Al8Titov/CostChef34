import express from 'express';
import { body } from 'express-validator';
import { getDishes, createDish, updateDish, deleteDish } from '../controllers/dishController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

const dishValidation = [
  body('name')
    .notEmpty()
    .withMessage('Dish name is required')
    .trim(),
  body('weight')
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number'),
  body('cost_price')
    .isFloat({ min: 0 })
    .withMessage('Cost price must be a positive number'),
  body('category_id')
    .isInt({ min: 1, max: 7 })
    .withMessage('Category ID must be between 1 and 7'),
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('At least one ingredient is required'),
  body('ingredients.*.name')
    .notEmpty()
    .withMessage('Ingredient name is required'),
  body('ingredients.*.quantity')
    .isFloat({ min: 0 })
    .withMessage('Ingredient quantity must be a positive number'),
  body('ingredients.*.price_per_unit')
    .isFloat({ min: 0 })
    .withMessage('Ingredient price per unit must be a positive number'),
  body('ingredients.*.cost')
    .isFloat({ min: 0 })
    .withMessage('Ingredient cost must be a positive number')
];

router.get('/', getDishes);
router.post('/', dishValidation, createDish);
router.put('/:id', dishValidation, updateDish);
router.delete('/:id', deleteDish);

export { router as dishRoutes };
