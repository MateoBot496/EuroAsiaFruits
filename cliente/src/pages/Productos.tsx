import type { JSX } from "react";
import { useMemo, useState, useRef, useEffect } from "react";
import useProductos from "../hooks/useProductos";
import ProductoCard from "../components/ProductoCard";
import { Link } from "react-router-dom";

function Productos(): JSX.Element {
  const { productos, loading } = useProductos();

  const [grupoActivo, setGrupoActivo]         = useState<string | null>(null);
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [desplegableOpen, setDesplegableOpen] = useState(false);
  const desplegableRef = useRef<HTMLDivElement>(null);

  // Cierra el desplegable al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (desplegableRef.current && !desplegableRef.current.contains(e.target as Node)) {
        setDesplegableOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Grupos únicos presentes en los productos
  const grupos = useMemo(() => {
    const set = new Set<string>();
    productos.forEach((p) => { if (p.grupo) set.add(p.grupo); });
    return Array.from(set).sort();
  }, [productos]);

  // Categorías únicas presentes en los productos
  const categorias = useMemo(() => {
    const set = new Set<string>();
    productos.forEach((p) => { if (p.categoria) set.add(p.categoria); });
    return Array.from(set).sort();
  }, [productos]);

  // Filtrado acumulativo: grupo AND categoría (cada uno independiente)
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const passGrupo     = !grupoActivo     || p.grupo     === grupoActivo;
      const passCategoria = !categoriaActiva || p.categoria === categoriaActiva;
      return passGrupo && passCategoria;
    });
  }, [productos, grupoActivo, categoriaActiva]);

  // Toggle grupo: segundo click en el mismo botón lo desactiva
  const handleGrupo = (grupo: string) => {
    setGrupoActivo(prev => prev === grupo ? null : grupo);
  };

  const handleCategoria = (cat: string | null) => {
    setCategoriaActiva(cat);
    setDesplegableOpen(false);
  };

  if (loading) {
    return (
      <div className="productos">
        <div className="pt-10 text-center">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="productos">
      <div className="border-b-2 border-gray-300 mb-10 pt-5 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Nuestros Productos</h1>

        <div className="filtros w-full flex gap-3 mb-3 justify-center flex-wrap items-center">

          {/* ── Botones de GRUPO (fijos, con colores) ── */}
          {grupos.map((grupo) => (
            <button
              key={grupo}
              onClick={() => handleGrupo(grupo)}
              className={`filtroBtn ${grupoActivo === grupo ? "filtroBtn--activo" : "filtroBtn--inactivo"}`}
            >
              {grupo}
            </button>
          ))}

          {/* ── Desplegable de CATEGORÍA ── */}
          <div className="filtroDesplegable" ref={desplegableRef}>
            <button
              className={`filtroBtn filtroDesplegable__trigger ${categoriaActiva ? "filtroBtn--activo" : "filtroBtn--inactivo"}`}
              onClick={() => setDesplegableOpen(prev => !prev)}
            >
              {categoriaActiva ?? "Categoría"}
              <span className={`filtroDesplegable__arrow ${desplegableOpen ? "filtroDesplegable__arrow--open" : ""}`}>▾</span>
            </button>

            {desplegableOpen && (
              <div className="filtroDesplegable__menu">
                <button
                  className="filtroDesplegable__item filtroDesplegable__item--todos"
                  onClick={() => handleCategoria(null)}
                >
                  Todas las categorías
                </button>
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    className={`filtroDesplegable__item ${categoriaActiva === cat ? "filtroDesplegable__item--activo" : ""}`}
                    onClick={() => handleCategoria(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Limpiar filtros (solo visible si hay alguno activo) ── */}
          {(grupoActivo || categoriaActiva) && (
            <button
              className="filtroBtn filtroBtn--limpiar"
              onClick={() => { setGrupoActivo(null); setCategoriaActiva(null); }}
            >
              × Limpiar filtros
            </button>
          )}

        </div>

        {/* Contador de resultados */}
        <p className="text-sm text-gray-500 mb-3">
          {productosFiltrados.length}{" "}
          {productosFiltrados.length === 1 ? "producto" : "productos"}
          {grupoActivo && ` · ${grupoActivo}`}
          {categoriaActiva && ` · ${categoriaActiva}`}
        </p>
      </div>

      <div className="productos-content">
        {productosFiltrados.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-10">
            No hay productos con los filtros seleccionados.
          </p>
        ) : (
          productosFiltrados.map((producto) => (
            <Link
              to={`/producto/${producto.id_producto}`}
              key={producto.id_producto}
              className="block h-full"
            >
              <ProductoCard producto={producto} simple />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Productos;
