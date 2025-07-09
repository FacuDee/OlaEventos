import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null; // o podés devolver un spinner si querés mostrar algo mientras carga
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
