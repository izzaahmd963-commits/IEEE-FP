import { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    platformCommission: 0
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch users
      const usersRes = await api.get('/admin/users');
      setUsers(usersRes.data);
      
      // Calculate stats
      const vendors = usersRes.data.filter(u => u.role === 'Vendor').length;
      
      setStats({
        totalUsers: usersRes.data.length,
        totalVendors: vendors,
        totalProducts: 0, // Will come from API
        totalOrders: 0, // Will come from API
        totalRevenue: 0,
        platformCommission: 0
      });
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await api.put(`/admin/users/${userId}`, {
        isActive: !currentStatus
      });
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error toggling user status:', error);
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
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs mb-1">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs mb-1">Vendors</h3>
          <p className="text-2xl font-bold">{stats.totalVendors}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs mb-1">Products</h3>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs mb-1">Orders</h3>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs mb-1">Revenue</h3>
          <p className="text-2xl font-bold">${stats.totalRevenue}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-xs mb-1">Commission</h3>
          <p className="text-2xl font-bold">${stats.platformCommission}</p>
        </div>
      </div>

      {/* User Management */}
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs
                    ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'Vendor' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs
                    ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleUserStatus(user._id, user.isActive)}
                    className={`text-sm ${user.isActive ? 'text-red-600' : 'text-green-600'} hover:underline`}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;