import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';
import ProductCard from '../../components/product/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-12 mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to {import.meta.env.VITE_STORE_NAME || 'Final Project'}
        </h1>
        <p className="text-xl">
          {import.meta.env.VITE_STORE_MODE === 'multi' 
            ? 'Discover unique products from independent sellers'
            : 'Discover our curated collection'}
        </p>
      </div>

      {/* Featured Products */}
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;