import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // Only keep useLocation if used below

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 