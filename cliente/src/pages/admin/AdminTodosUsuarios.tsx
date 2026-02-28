import { useState } from "react";
import SearchbarAdmin from "../../components/SearchbarAdmin";
import { Link } from "react-router-dom";
import deleteProducto from "../../hooks/deleteProducto";
import useUsuarios from "../../hooks/useUsuarios";
import type Usuario from "../../interfaces/usuarioInterface";

export default function AdminTodosUsuarios() {
  const { usuarios, loading, fetchUsuarios } = useUsuarios();
  const [search, setSearch] = useState("");

  const handleDelete = async (id: number) => {
    const ok = window.confirm(
        "¿Estás seguro de que deseas eliminar este producto?",
        );
    if (!ok) return;
    try {
      await deleteProducto(id);
      await fetchUsuarios(); // Refetch usuarios to update the list
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-10">
      <div className="flex justify-center items-center gap-4">
        <h2 className="text-2xl font-bold mb-4">Todos los Usuarios</h2>

        <SearchbarAdmin onSearch={setSearch} />
      </div>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
          {usuariosFiltrados.map((usuario) => (
            <div key={usuario.id} className="p-3 flex flex-col items-center border rounded bg-gray-100">
                <p className="font-bold">{usuario.email}</p>
                {usuario.role == 1 ? <p className="text-3xl text-red-500">Superadmin</p> : <p className="text-3xl text-green-500">Admin</p>}
                {usuario.is_active == 1 ? <p className="text-green-500">Activo</p> : <p className="text-red-500">Inactivo</p>}

              <div className="w-full">
                <Link to={`/admin/usuario/${usuario.id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full hover:bg-blue-600 hover:cursor-pointer">
                    Editar
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
