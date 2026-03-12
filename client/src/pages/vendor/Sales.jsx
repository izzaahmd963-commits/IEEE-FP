import { useEffect, useState } from 'react';
import api from '../../api/axios';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    platformFee: 0,
    netEarnings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await api.get('/orders/vendor/sales');
      setSales(response.data.orders || []);
      setStats({
        totalRevenue: response.data.totalRevenue || 0,
        platformFee: response.data.platformFee || 0,
        netEarnings: response.data.netEarnings || 0
      });
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading sales...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Sales History</h1>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Platform Fee</h3>
          <p className="text-3xl font-bold">${stats.platformFee.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Net Earnings</h3>
          <p className="text-3xl font-bold">${stats.netEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Sales List */}
      {sales.length === 0 ? (
        <p className="text-center text-gray-500">No sales yet.</p>
      ) : (
        <div className="space-y-4">
          {sales.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${order.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}`}
                >
                  {order.status}
                </span>
              </div>
              
              <div className="border-t pt-4">
                {order.items
                  .filter(item => item.vendorId === order.vendorId) // Filter vendor's items
                  .map((item, index) => (
                    <div key={index} className="flex justify-between py-2">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
              </div>
              
              <div className="border-t pt-4 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Customer</span>
                  <span>{order.customerId?.name || 'Unknown'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sales;