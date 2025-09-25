import Product from '../models/Product.js';
import { validationResult } from 'express-validator';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user_id: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error getting products' });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log('Received product data:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      const errorMessage = errors.array().map(err => err.msg).join(', ');
      return res.status(400).json({ error: errorMessage });
    }

    const productData = {
      ...req.body,
      user_id: req.user._id
    };

    console.log('Product data to save:', productData);

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    if (error.name === 'ValidationError') {
      const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }
    res.status(500).json({ error: 'Server error creating product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Server error updating product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error deleting product' });
  }
};
