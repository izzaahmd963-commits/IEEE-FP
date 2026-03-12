const express = require('express');
const { 
  createOrder, 
  getMyOrders, 
  getVendorSales,
  getOrders,
  updateOrderStatus 
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, authorize('Customer'), createOrder)
  .get(protect, authorize('Admin'), getOrders);

router.get('/mine', protect, authorize('Customer'), getMyOrders);
router.get('/vendor/sales', protect, authorize('Vendor'), getVendorSales);
router.put('/:id/status', protect, authorize('Vendor', 'Admin'), updateOrderStatus);

module.exports = router;