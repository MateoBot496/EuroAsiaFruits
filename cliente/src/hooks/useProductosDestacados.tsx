import { useEffect, useState } from "react";
import type Producto from "../interfaces/productoInterface";

export default function useProductosDestacados() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        async function fetchProductosDestacados() {
            try {
                const res: Response = await fetch("http://localhost:3000/api/public/productos-destacados");
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

        fetchProductosDestacados();


    }, []);

    useEffect(() => {
        //console.log(productos);
    }, [productos]);

    return { productos, loading };

}
