import { useState } from "react";
import { useCatalogos } from "../../hooks/useCatalogos";

export default function AdminOrigenes() {
  const { catalogos } = useCatalogos();
  const [isOpen, setIsOpen] = useState(false);
  const [modo, setModo] = useState("crear"); // o "editar"
  const [categoriaActual, setCategoriaActual] = useState<Categoria | null>(
    null,
  );
  const [nombre, setNombre] = useState("");

  const abrirCrear = () => {
    setModo("crear");
    setNombre("");
    setIsOpen(true);
  };

  type Categoria = {
    id_categoria: number;
    nombre: string;
    isActive: boolean;
  };

  const handleSubmit = async () => {
    if (!nombre.trim()) return;

    try {
      if (modo === "crear") {
        try {
          const res = await fetch(
            "http://localhost:3000/api/admin/catalogos?tipo=origenes",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // 🔥 cookies
              body: JSON.stringify({ valor: nombre }),
            },
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message);
          }

          alert(`  Origen creado con éxito!`);
          console.log("Origen creado:", data);
          setIsOpen(false);
          window.location.reload(); // 🔥 recargar para ver cambios
          return data;


        } catch (error: any) {
          console.error("Error:", error.message);
        }
      } else {
        if (!categoriaActual) return;
                try {
            const res = await fetch(
              `http://localhost:3000/api/admin/catalogos?tipo=origenes`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include", // si usas cookies
                body: JSON.stringify({
                  oldValor: categoriaActual.nombre, // el valor anterior
                  newValor: nombre,                // el nuevo nombre
                }),
              }
            );

            const data = await res.json();

            if (!res.ok) {
              throw new Error(data.message);
            }

            console.log("Origen actualizada:", data);
            alert(`Origen renombrado a "${data.valor}"`);
            
            setIsOpen(false);
            setCategoriaActual(null);
            setNombre("");
            
            window.location.reload(); // 🔥 recargar para ver cambios

            

          } catch (error: any) {
            console.error("Error editando origen:", error.message);
            alert(error.message);
          }
      }

      // 🔥 refrescar datos
    } catch (err) {
      console.error(err);
    }
  };

  const abrirEditar = (cat: any) => {
    setModo("editar");
    setCategoriaActual(cat);
    setNombre(cat.nombre);
    setIsOpen(true);
  };

  const eliminarCategoria = async (categoria: any) => {
    if (!confirm("¿Seguro que quieres eliminar esta origen?")) return;

    try {
    const res = await fetch(
      `http://localhost:3000/api/admin/catalogos/active?tipo=origenes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // si usas cookies
        body: JSON.stringify({
          valor: categoria.nombre ,        // nombre de la categoría
          isActive: categoria.is_active ? 0 : 1, // alterna activo/inactivo
        }),
      }
    );
    alert(`Origen ${categoria.is_active ? "desactivado" : "activado"}: ${categoria.nombre}`);
    console.log("Respuesta eliminar/activar:", res);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }


    window.location.reload(); // 🔥 recargar para ver cambios

  } catch (error: any) {
    console.error("Error cambiando estado:", error.message);
    alert(error.message);
  }

    // refrescar
  };

  return (
    <div className="flex">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">
              {modo === "crear" ? "Crear categoría" : "Editar categoría"}
            </h2>

            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Nombre"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)}>Cancelar</button>

              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">
          Administración de Origenes
        </h1>
        <p>Aquí puedes gestionar los origenes de productos.</p>
        <h1> Todas los origenes</h1>

        <button
          onClick={abrirCrear}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-4"
        >
          Crear nuevo origen
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {catalogos?.origenes.map((categoria) => (
            <div key={categoria.id_origen} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{categoria.nombre}</h2>
              { categoria.is_active ? (
                <p className="text-green-600 font-medium">Activa</p>
              ) : (
                <p className="text-red-600 font-medium">Inactiva</p>
              )}
              <button
                onClick={() => abrirEditar(categoria)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-2"
              >
                Editar
              </button>
              <button onClick={() => eliminarCategoria(categoria)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-2 ml-2">
                Cambiar estado
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
