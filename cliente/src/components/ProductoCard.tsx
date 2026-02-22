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
        <div className="w-full h-52 overflow-hidden">
          <img
            src={producto.url_imagen}
            alt={producto.nombre}
            className="
              w-full h-full object-cover
              transition-transform duration-300
              
              rounded-t-lg
              hover:scale-105
              hover:cursor-pointer
            "
          />
        </div>
      )}

      {/* Contenido */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {producto.nombre}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3">
          {producto.descripcion}
        </p>

        <div className="flex flex-col gap-1 text-sm text-gray-700">
          <p>
            <span className="font-medium text-gray-900">Envase:</span>{" "}
            {producto.envases}
          </p>

          <p>
            <span className="font-medium text-gray-900">Origen:</span>{" "}
            {producto.origen}
          </p>
        </div>
      </div>
    </div>
  );
}