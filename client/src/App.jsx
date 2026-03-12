import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/customer/Home';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VendorDashboard from './pages/vendor/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />

            {/* Customer Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Customer', 'Vendor', 'Admin']} />}>
              {/* Add customer routes here */}
            </Route>

            {/* Vendor Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Vendor']} />}>
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
              {/* Add admin routes here */}
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;