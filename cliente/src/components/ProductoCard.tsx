import type { JSX } from "react";
import type ProductoCardProps from "../interfaces/productoCardProps";

export default function ProductoCard({
  producto,
}: ProductoCardProps): JSX.Element {
  return (
    <div
      className="
        producto-card
      "
    >
      {/* Imagen del producto */}
      {producto.url_imagen && (
        <div className="">
          <img
            src={producto.url_imagen}
            alt={producto.nombre}
            className="
              producto-imagen
            "
          />
        </div>
      )}

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {producto.nombre}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3">
          {producto.descripcion}
        </p>

        <p className="text-sm text-gray-700">
          <span className="font-medium">Envase:</span> {producto.envases}
        </p>

        <p className="text-sm text-gray-700">
          <span className="font-medium">Origen:</span> {producto.origen}
        </p>
      </div>
    </div>
  );
}
