const express = require('express');
const { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getVendorProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('Vendor', 'Admin'), createProduct);

router.get('/vendor/mine', protect, authorize('Vendor'), getVendorProducts);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorize('Vendor', 'Admin'), updateProduct)
  .delete(protect, authorize('Vendor', 'Admin'), deleteProduct);

module.exports = router;