import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearCurrentProduct } from '../../features/productSlice';
import { addToCart } from '../../features/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <img 
            src={product.images[selectedImage]} 
            alt={product.name}
            className="w-full rounded-lg shadow-lg mb-4"
          />
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2
                    ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          {/* Vendor Info in Multi-vendor mode */}
          {import.meta.env.VITE_STORE_MODE === 'multi' && product.vendorId && (
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="font-semibold">Sold by:</p>
              <p className="text-gray-600">{product.vendorId.name}</p>
              {product.vendorId.storeInfo?.description && (
                <p className="text-sm text-gray-500 mt-1">{product.vendorId.storeInfo.description}</p>
              )}
            </div>
          )}

          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="mb-4">
            <span className="text-3xl font-bold text-blue-600">${product.price}</span>
          </div>

          {/* Category */}
          <div className="mb-4">
            <span className="text-sm text-gray-500">Category: </span>
            <span className="bg-gray-200 px-2 py-1 rounded text-sm">{product.category}</span>
          </div>

          {/* Stock Status */}
          <p className={`mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-4">
              <label className="font-semibold">Quantity:</label>
              <select 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-3 py-2"
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full md:w-auto px-8 py-3 rounded-lg text-white font-semibold
              ${product.stock > 0 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'}`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;