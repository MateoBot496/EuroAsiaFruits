import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function LoginRoute({ children }: { children: JSX.Element }) {
  const { role, loading } = useAuth();

  if (loading) return <div>Cargando...</div>; // Espera fetch

  const numericRole = role !== null ? Number(role) : null;

  const isLoggedIn = numericRole === 0 || numericRole === 1;

  if (!isLoggedIn) return children; // no logueado → puede ver login

  return <Navigate to="/admin" replace />; // logueado → redirige
}