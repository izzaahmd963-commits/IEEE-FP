const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    
    // Calculate total
    let totalAmount = 0;
    let platformCommission = 0;
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      
      totalAmount += product.price * item.quantity;
      
      // Calculate commission in multi-vendor mode
      if (process.env.STORE_MODE === 'multi') {
        platformCommission += (product.price * item.quantity * (process.env.PLATFORM_COMMISSION_RATE || 0.1));
      }
    }
    
    const order = await Order.create({
      customerId: req.user._id,
      items,
      totalAmount,
      platformCommission,
      shippingAddress,
      status: 'Pending'
    });
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user._id })
      .populate('items.productId', 'name images')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor sales
// @route   GET /api/orders/vendor/sales
// @access  Private/Vendor
const getVendorSales = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.vendorId': req.user._id,
      status: { $in: ['Paid', 'Delivered'] }
    }).populate('customerId', 'name email');
    
    // Calculate revenue
    let totalRevenue = 0;
    let platformFee = 0;
    
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.vendorId.toString() === req.user._id.toString()) {
          totalRevenue += item.price * item.quantity;
        }
      });
    });
    
    platformFee = totalRevenue * (process.env.PLATFORM_COMMISSION_RATE || 0.1);
    
    res.json({
      orders,
      totalRevenue,
      platformFee,
      netEarnings: totalRevenue - platformFee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('customerId', 'name email')
      .populate('items.productId', 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Vendor
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if vendor can update this order
    if (req.user.role === 'Vendor') {
      const hasVendorItem = order.items.some(
        item => item.vendorId.toString() === req.user._id.toString()
      );
      if (!hasVendorItem) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }
    
    order.status = status;
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getVendorSales,
  getOrders,
  updateOrderStatus
};