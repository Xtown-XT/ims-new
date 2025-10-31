// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../utils/Loading';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div><Loading /></div>;
    }

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Admin can access everything even if allowedRoles is set
    if (user.role_name && user.role_name.toLowerCase() === 'admin' || user.role_name.toLowerCase() === 'cluster admin' || user.role_name.toLowerCase() === 'branch admin') {
        return children;
    }

    // For non-admin users, check if their role is allowed
    if (allowedRoles.length > 0 && (!user.role_name || !allowedRoles.includes(user.role_name))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;