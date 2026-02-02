import { useState } from "react";
import ProductoCard from "../../components/ProductoCard";
import SearchbarAdmin from "../../components/SearchbarAdmin";
import useProductos from "../../hooks/useProductos";
import { Link } from "react-router-dom";
import deleteProducto  from "../../hooks/deleteProducto";

export default function AdminTodosProductos() {
  const { productos, loading, fetchProductos } = useProductos();
  const [search, setSearch] = useState("");

  const handleDelete = async (id_producto: number) => {
    const ok = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!ok) return;
    try {
      await deleteProducto(id_producto);
      await fetchProductos(); // Refetch productos to update the list
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }

  };


  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10">
      <div className="flex justify-center items-center gap-4">
        <h2 className="text-2xl font-bold mb-4">
          Todos los Productos
        </h2>

        <SearchbarAdmin onSearch={setSearch} />
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id_producto}
              className="p-3 flex flex-col items-center"
            >
              <ProductoCard producto={producto} />

              <div className="w-full">
                <Link to={`/admin/producto/${producto.id_producto}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full hover:bg-blue-600 hover:cursor-pointer">
                    Editar
                  </button>
                </Link>
                
                <button className="bg-red-500 text-white px-4 py-2 mt-2 rounded w-full hover:bg-red-600 hover:cursor-pointer" 
                  onClick={() => handleDelete(producto.id_producto)}>
                  Borrar
                </button>
              </div>
            </div>
          )
        )}
        </div>
      )}
    </div>
  );
}
