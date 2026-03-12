import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    stock: '',
    images: []
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const categories = ['Electronics', 'Fashion', 'Food', 'Handmade', 'Art', 'Other'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Simulated image upload (will connect to Cloudinary later)
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    // Simulate upload - replace with actual Cloudinary upload
    setTimeout(() => {
      const urls = files.map((file, index) => 
        `https://via.placeholder.com/300?text=Image+${index + 1}`
      );
      setImageUrls([...imageUrls, ...urls]);
      setFormData({
        ...formData,
        images: [...imageUrls, ...urls]
      });
      setUploading(false);
    }, 1000);
  };

  const removeImage = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    setFormData({
      ...formData,
      images: newUrls
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (imageUrls.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setLoading(true);
    
    try {
      await api.post('/products', formData);
      navigate('/vendor/dashboard');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
            maxLength="120"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
            maxLength="2000"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="stock">
              Stock *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Product Images *
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {uploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading images...</p>
          )}
          
          {/* Image Preview */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img 
                    src={url} 
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || uploading}
          className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700
            ${(loading || uploading) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;