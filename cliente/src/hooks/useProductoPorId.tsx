import { use, useEffect, useState } from "react";
import type Producto from "../interfaces/productoInterface";

export default function useProductos(id: string | undefined) {

    const [producto, setProductos] = useState<Producto>({} as Producto);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        
        async function fetchProductos() {
            try {
                const res: Response = await fetch(`http://localhost:3000/api/public/productos/${id}`);
                if (!res.ok) {
                    throw new Error(`Error del servidor: ${res.status}`);
                }
                const data: Producto = await res.json();
                setProductos(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProductos();


    },[id]);


    return { producto, loading };

}