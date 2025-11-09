import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRoles }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando autenticación...</div>; // O un spinner de carga
  }

  if (!user) {
    // Usuario no autenticado, redirigir a la página de login
    return <Navigate to="/login" replace />;
  }

  // Check for role-based access
  if (requiredRoles && requiredRoles.length > 0) {
    if (!user.id_rol || !requiredRoles.includes(user.id_rol)) {
      // Usuario no tiene el rol requerido, redirigir a una página de no autorizado o al home
      return <Navigate to="/" replace />; // Redirect to home or a specific unauthorized page
    }
  }

  return children; // Usuario autenticado y autorizado, renderizar el componente hijo
}

export default ProtectedRoute;
