import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();

  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return (
      <main style={{ padding: "32px" }}>
        <p>Comprobando sesión y permisos...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/gestor-escribania-jcp/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.rol)
  ) {
    return (
      <Navigate
        to="/gestor-escribania-jcp/sin-permiso"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;