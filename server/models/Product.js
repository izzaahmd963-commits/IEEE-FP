const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [120, 'Product name cannot exceed 120 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be positive']
  },
  images: [{
    type: String,
    required: [true, 'Please add at least one image']
  }],
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Electronics', 'Fashion', 'Food', 'Handmade', 'Art', 'Other']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better performance
productSchema.index({ category: 1, vendorId: 1, isActive: 1 });

module.exports = mongoose.model('Product', productSchema);