import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  role: number; // 0 = admin, 1 = superadmin
  nombre: string;
  email: string;
  // cualquier otro campo que tengas
}

export const useGetUsuarioActual = () => {
  const [me, setMe] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include",
      });

      if (res.status === 401) {
        // Sesión expirada o no logueado
        setMe(null);
        return;
      }

      if (!res.ok) {
        throw new Error("Error al obtener el usuario actual");
      }

      const data = await res.json();
      setMe(data.user ?? null); // protege contra undefined

    } catch (error) {
      console.error("Error al obtener el usuario actual:", error);
      setMe(null);
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
    refreshUser,
  };
};