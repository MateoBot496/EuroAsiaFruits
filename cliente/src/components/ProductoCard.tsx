import type { JSX } from "react";
import type ProductoCardProps from "../interfaces/productoCardProps";

export default function ProductoCard({ producto }: ProductoCardProps): JSX.Element {
    return (
        <div className="producto-card">

            {/* Imagen del producto */}
            {producto.url_imagen && (
                <img
                    src={producto.url_imagen}
                    alt={producto.nombre}
                    className="producto-imagen"
                />
            )}
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>{producto.envases}</p>
            <p>{producto.origen}</p>

        </div>
    );
}