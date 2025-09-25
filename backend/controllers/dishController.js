import Dish from '../models/Dish.js';
import { validationResult } from 'express-validator';

export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({ user_id: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(dishes);
  } catch (error) {
    console.error('Get dishes error:', error);
    res.status(500).json({ error: 'Server error getting dishes' });
  }
};

export const createDish = async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map(err => err.msg).join(', ');
      return res.status(400).json({ error: errorMessage });
    }

    const dishData = {
      ...req.body,
      user_id: req.user._id
    };


    const dish = new Dish(dishData);
    await dish.save();

    res.status(201).json(dish);
  } catch (error) {
    console.error('Create dish error:', error);
    if (error.name === 'ValidationError') {
      const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }
    res.status(500).json({ error: 'Server error creating dish' });
  }
};

export const updateDish = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const dish = await Dish.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }

    res.json(dish);
  } catch (error) {
    console.error('Update dish error:', error);
    res.status(500).json({ error: 'Server error updating dish' });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id
    });

    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }

    res.json({ message: 'Dish deleted successfully' });
  } catch (error) {
    console.error('Delete dish error:', error);
    res.status(500).json({ error: 'Server error deleting dish' });
  }
};
