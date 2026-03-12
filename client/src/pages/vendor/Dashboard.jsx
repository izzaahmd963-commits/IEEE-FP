import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const VendorDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        api.get('/products/vendor/mine'),
        api.get('/orders/vendor/sales')
      ]);
      
      const products = productsRes.data;
      const lowStock = products.filter(p => p.stock <= 5);
      
      setStats({
        totalProducts: products.length,
        totalOrders: ordersRes.data?.length || 0,
        totalRevenue: ordersRes.data?.totalRevenue || 0,
        lowStockProducts: lowStock
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Vendor Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Low Stock Alert */}
      {stats.lowStockProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Low Stock Alert</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            {stats.lowStockProducts.map(product => (
              <div key={product._id} className="flex justify-between items-center py-2">
                <span>{product.name}</span>
                <span className="text-red-600 font-semibold">Stock: {product.stock}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          to="/vendor/products/add"
          className="bg-blue-600 text-white p-6 rounded-lg text-center hover:bg-blue-700"
        >
          <h3 className="text-xl font-bold mb-2">Add New Product</h3>
          <p>List a new product in your store</p>
        </Link>
        
        <Link 
          to="/vendor/sales"
          className="bg-green-600 text-white p-6 rounded-lg text-center hover:bg-green-700"
        >
          <h3 className="text-xl font-bold mb-2">View Sales</h3>
          <p>Check your sales history and earnings</p>
        </Link>
      </div>
    </div>
  );
};

export default VendorDashboard;