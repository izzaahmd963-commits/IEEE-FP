const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', protect, authorize('Admin'), async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Toggle user active status
// @access  Private/Admin
router.put('/users/:id', protect, authorize('Admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isActive = req.body.isActive;
    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/stats
// @desc    Get platform stats
// @access  Private/Admin
router.get('/stats', protect, authorize('Admin'), async (req, res) => {
  try {
    const users = await User.countDocuments();
    const vendors = await User.countDocuments({ role: 'Vendor' });
    const products = await Product.countDocuments({ isActive: true });
    const orders = await Order.countDocuments();
    
    const revenue = await Order.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    
    const commission = await Order.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$platformCommission' } } }
    ]);
    
    res.json({
      totalUsers: users,
      totalVendors: vendors,
      totalProducts: products,
      totalOrders: orders,
      totalRevenue: revenue[0]?.total || 0,
      totalCommission: commission[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;