import type { JSX } from "react";
import type ProductoCardProps from "../interfaces/productoCardProps";

//componente que crea una tarjeta para cada uno de los productos que habrá en el catálogo.
export default function ProductoCard({producto}: ProductoCardProps): JSX.Element {
    return (
        <div className="producto-card">
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>{producto.envases}</p>
            <p>{producto.origen}</p>

        </div>
    );
}