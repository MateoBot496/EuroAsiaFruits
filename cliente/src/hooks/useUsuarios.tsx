import { useEffect, useState } from "react";
import type Usuario from "../interfaces/usuarioInterface";

export default function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const res: Response = await fetch(
        "http://localhost:3000/api/admin/users/",
        {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      );
      if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
      }
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return { usuarios, loading, fetchUsuarios };
}
