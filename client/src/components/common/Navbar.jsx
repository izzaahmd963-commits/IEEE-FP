import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { itemCount } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            {import.meta.env.VITE_STORE_NAME || 'Final Project'}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Hi, {user.name}</span>
                {user.role === 'Vendor' && (
                  <Link to="/vendor/dashboard" className="text-gray-700 hover:text-blue-600">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/auth/register" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;