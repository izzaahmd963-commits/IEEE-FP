const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

// @route   GET /api/vendors
// @desc    Get all vendors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const vendors = await User.find({ 
      role: 'Vendor', 
      isActive: true 
    }).select('name storeInfo');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/vendors/:id
// @desc    Get vendor profile
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vendor = await User.findOne({ 
      _id: req.params.id, 
      role: 'Vendor',
      isActive: true 
    }).select('name storeInfo');
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    // Get vendor's products
    const products = await Product.find({ 
      vendorId: vendor._id, 
      isActive: true 
    });
    
    res.json({ vendor, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;