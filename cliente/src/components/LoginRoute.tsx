import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function LoginRoute({ children }: { children: JSX.Element }) {
    const { role, loading } = useAuth();
      if (loading) return <div>Cargando...</div>; // esperar a que el contexto cargue

  if (!role) {
    // No logueado → redirigir a login
    console.log("LoginRoute: Usuario no logueado : " + role);
    return children;
  }else {
    // Ya logueado → redirigir a admin
    return <Navigate to="/admin" replace />;
  }

  
}