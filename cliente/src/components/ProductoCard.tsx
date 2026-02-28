import type { JSX } from "react";
import type ProductoCardProps from "../interfaces/productoCardProps";
import { formatLabel } from "../utils/formatLabel";

export default function ProductoCard({
  producto,
  simple = false,
}: ProductoCardProps): JSX.Element {
  return (
    <div className="producto-card h-full flex flex-col bg-white rounded-xl shadow-md p-4">

      {/* Imagen cuadrada con espacio interno */}
      {producto.url_imagen && (
        <div className="w-full aspect-square overflow-hidden rounded-lg">
          <img
            src={producto.url_imagen}
            alt={producto.nombre}
            className="
              w-full h-full object-cover
              transition-transform duration-300
              hover:scale-105
            "
          />
        </div>
      )}

      <div className="flex flex-col gap-3 flex-1 pt-4">
        <h2
          className={`
            text-lg font-semibold text-gray-900
            ${simple ? "text-center" : "text-left"}
          `}
        >
          {formatLabel(producto.nombre)}
        </h2>

        <p
          className={`
            text-sm text-gray-600 line-clamp-3 leading-relaxed
            ${simple ? "text-center" : "text-left"}
          `}
        >
          {formatLabel(producto.descripcion)}
        </p>

        {!simple && (
          <div className="flex flex-col gap-1 text-sm text-gray-700 mt-auto">
            <p>
              <span className="font-medium text-gray-900">Referencia:</span>{" "}
              {producto.referencia}
            </p>

            <p>
              <span className="font-medium text-gray-900">Envase:</span>{" "}
              {formatLabel(producto.envases)}
            </p>

            <p>
              <span className="font-medium text-gray-900">Origen:</span>{" "}
              {formatLabel(producto.origen)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}