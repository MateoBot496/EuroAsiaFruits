import type { JSX } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProductoPorId from "../hooks/useProductoPorId";
import { formatLabel } from "../utils/formatLabel";
import FormularioContacto from "../components/FormularioContacto";

export default function Producto(): JSX.Element {
  const { id } = useParams();
  const { producto, loading } = useProductoPorId(id);

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  if (loading) return <p>Cargando...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  const nombreUI = formatLabel(producto.nombre);
  const descUI = producto.descripcion ? formatLabel(producto.descripcion) : "";

  return (
    <div className="w-full flex justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-6">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50">
                {producto.url_imagen ? (
                  <img
                    src={producto.url_imagen}
                    alt={nombreUI}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900">{nombreUI}</h1>

              {descUI && (
                <p className="mt-4 text-gray-700 leading-relaxed">{descUI}</p>
              )}

              <div className="mt-4 text-gray-700 leading-relaxed">
                {producto.referencia && (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Referencia:
                    </span>{" "}
                    {producto.referencia}
                  </div>
                )}

                {producto.origen && (
                  <div>
                    <span className="font-semibold text-gray-900">Origen:</span>{" "}
                    {formatLabel(producto.origen)}
                  </div>
                )}

                {producto.envases && (
                  <div>
                    <span className="font-semibold text-gray-900">Envase:</span>{" "}
                    {formatLabel(producto.envases)}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-8 flex justify-start">
                <button
                  onClick={openModal}
                  className="rounded-xl px-6 py-3 font-semibold bg-black text-white hover:bg-gray-800 transition"
                >
                  Consultar este producto
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/productos" className="text-blue-500 underline">
            Volver a Productos
          </Link>
        </div>
      </div>

      <FormularioContacto
        open={open}
        onClose={closeModal}
        productoNombre={nombreUI}
        productoReferencia={producto.referencia ?? ""}
        showProductoFields={true}   // demostrar Nombre y Referencia 
      />
    </div>
  );
}