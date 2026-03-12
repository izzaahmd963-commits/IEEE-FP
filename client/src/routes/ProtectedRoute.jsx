import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, token } = useSelector((state) => state.auth);
  
  if (!token || !user) {
    return <Navigate to="/auth/login" />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;