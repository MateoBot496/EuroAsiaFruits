import { useEffect, useState } from "react";
import type Producto from "../interfaces/productoInterface";

export default function useProductos() {

    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        async function fetchProductos() {
            try {
                const res: Response = await fetch("http://localhost:3000/api/public/productos/");
                if (!res.ok) {
                    throw new Error(`Error del servidor: ${res.status}`);
                }
                const data: Producto[] = await res.json();
                setProductos(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProductos();


    },[]);

    useEffect(() => {
        console.log(productos);
    }, [productos]);

    return { productos, loading };

}