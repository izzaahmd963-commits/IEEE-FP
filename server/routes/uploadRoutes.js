const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'final-project',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif']
  }
});

const upload = multer({ storage });

// @route   POST /api/upload
// @desc    Upload image
// @access  Private/Vendor/Admin
router.post('/', protect, authorize('Vendor', 'Admin'), upload.single('image'), (req, res) => {
  try {
    res.json({ 
      url: req.file.path,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images
// @access  Private/Vendor/Admin
router.post('/multiple', protect, authorize('Vendor', 'Admin'), upload.array('images', 5), (req, res) => {
  try {
    const urls = req.files.map(file => file.path);
    res.json({ 
      urls,
      message: 'Images uploaded successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;