import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  display_quantity: {
    type: Number,
    required: true,
    min: 0
  },
  display_unit: {
    type: String,
    required: true
  },
  price_per_unit: {
    type: Number,
    required: true,
    min: 0
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  }
});

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  process: {
    type: String,
    default: ''
  },
  image_url: {
    type: String,
    default: 'https://via.placeholder.com/280x150'
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  cost_price: {
    type: Number,
    required: true,
    min: 0
  },
  category_id: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7]
  },
  ingredients: [ingredientSchema],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Dish', dishSchema);
