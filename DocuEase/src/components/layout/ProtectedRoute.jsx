import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../services/authService';

export const ProtectedRoute = () => {
  const isAuth = authService.isAuthenticated();
  
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};
