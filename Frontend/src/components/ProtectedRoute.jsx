import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRoles }) {
  const { user, isLoading } = useAuth();

  console.log("ProtectedRoute - user:", user); // Nuevo
  console.log("ProtectedRoute - isLoading:", isLoading); // Nuevo
  console.log("ProtectedRoute - requiredRoles:", requiredRoles); // Nuevo

  if (isLoading) {
    return <div>Cargando autenticación...</div>; // O un spinner de carga
  }

  if (!user) {
    console.log("ProtectedRoute - User not authenticated, redirecting to /login"); // Nuevo
    return <Navigate to="/login" replace />;
  }

  // Check for role-based access
  if (requiredRoles && requiredRoles.length > 0) {
    console.log("ProtectedRoute - User role:", user.id_rol); // Nuevo
    if (!user.id_rol || !requiredRoles.includes(user.id_rol)) {
      console.log("ProtectedRoute - User does not have required role, redirecting to /"); // Nuevo
      return <Navigate to="/" replace />; // Redirect to home or a specific unauthorized page
    }
  }

  return children; // Usuario autenticado y autorizado, renderizar el componente hijo
}

export default ProtectedRoute;
