//Este hook sirve para obtener los datos del usuario actual, es decir, el admin que ha iniciado sesión. Se utiliza en la página de edición de usuario para mostrar los datos actuales del usuario que se va a editar.

import {
  useEffect,
  useState,
} from "react";

export const useGetUsuarioActual = () => {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Llama al backend para obtener el rol
  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include", // 👈 importante para cookies httpOnly
      });
      const data = await res.json();
      if (res.ok) {
        setMe(data.user); // Aquí guardamos el usuario completo, no solo el rol
      }
    } catch (error) {
      console.error("Error al obtener el usuario actual:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return {
    me,
    loading,
    refreshUser
  };
};
