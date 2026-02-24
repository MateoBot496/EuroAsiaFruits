import { useState, useEffect } from "react";
import type Usuario from "../interfaces/usuarioInterface";

export default function useGetUsuarioPorEmail(email: string) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsuario = async () => {
    if (!email || email.trim() === "" || !email.includes("@")) return;

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/admin/users/email/${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!res.ok) {
        setUsuario(null);
        return;
      }

      const data = await res.json();
      setUsuario(data);
    } catch (error) {
      console.error("Error fetching usuario:", error);
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  // Este useEffect se encarga de ejecutar fetchUsuario cuando cambie email
  useEffect(() => {
    fetchUsuario();
  }, [email]);

  return { usuario, loading };
}