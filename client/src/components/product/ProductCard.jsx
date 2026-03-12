import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product._id}`}>
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-orange-500 text-sm">
              Only {product.stock} left!
            </span>
          )}
          {product.stock === 0 && (
            <span className="text-red-500 text-sm">
              Out of Stock
            </span>
          )}
        </div>

        {import.meta.env.VITE_STORE_MODE === 'multi' && product.vendorId && (
          <p className="text-sm text-gray-500 mb-3">
            Sold by: {product.vendorId.name}
          </p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded-lg font-semibold transition-colors
            ${product.stock > 0 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;