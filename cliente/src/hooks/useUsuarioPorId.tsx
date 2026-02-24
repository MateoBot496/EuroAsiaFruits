import { useEffect, useState } from "react";
import type Usuario from "../interfaces/usuarioInterface";

export default function useUsuarioPorId(id: any) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

    const fetchUsuario = async () => {  
        try {
        setLoading(true);
        const res: Response = await fetch(
            `http://localhost:3000/api/admin/users/${id}`,
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

            const data: Usuario = await res.json();
            setUsuario(data);
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
        fetchUsuario();
        }
    }, [id]);

    return { usuario, loading, fetchUsuario };
}

