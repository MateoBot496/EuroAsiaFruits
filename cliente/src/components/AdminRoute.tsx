import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { role, loading } = useAuth();

  if (loading) return <div>Cargando...</div>; // Espera al fetch

  const numericRole = role !== null ? Number(role) : null;

  // Usuario no logueado
  if (numericRole === null) {
    return <Navigate to="/login" replace />;
  }

  // Solo admin o superadmin
  if (numericRole !== 0 && numericRole !== 1) {
    return <div>No tienes permisos para esta página</div>;
  }

  return children; // autorizado
};