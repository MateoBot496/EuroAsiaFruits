import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { role, loading } = useAuth();

  if (loading) return <div>Cargando...</div>; // esperar a que el contexto cargue

  if (role === "guest") {
    // No logueado → redirigir a login
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    // No tiene permisos
    return <div>No tienes permisos para esta página</div>;
  }

  // Usuario admin → renderiza la página
  return children;
};
