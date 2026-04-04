import type { JSX } from "react";
import { useMemo, useState, useRef, useEffect } from "react";
import useProductos from "../hooks/useProductos";
import ProductoCard from "../components/ProductoCard";
import { Link } from "react-router-dom";

const LABELS: Record<string, string> = {
  "aromatico":  "Aromático",
  "citrica":    "Cítrico",
  "melon":      "Melón",
  "hueso":      "Frutas de hueso",
  "raiz":       "Verduras de raíz",
  "tuberculo":  "Tubérculo",
  "marron":     "Setas marrones",
  "blanco":     "Setas blancas",
  "pepita":     "Fruta de pepita",
  "tallo":      "Verduras de tallo",
};

const formatearCategoria = (cat: string) => {
  const key = cat.toLowerCase();
  if (LABELS[key]) return LABELS[key];
  return cat
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function Productos(): JSX.Element {
  const { productos, loading } = useProductos();

  const [grupoActivo, setGrupoActivo]         = useState<string | null>(null);
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [soloAereo, setSoloAereo]             = useState(false);
  const [soloAsiatico, setSoloAsiatico]       = useState(false);
  const [desplegableOpen, setDesplegableOpen] = useState(false);
  const desplegableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (desplegableRef.current && !desplegableRef.current.contains(e.target as Node)) {
        setDesplegableOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const grupos = useMemo(() => {
    const set = new Set<string>();
    productos.forEach((p) => { if (p.grupo) set.add(p.grupo); });
    return Array.from(set).sort();
  }, [productos]);

  const categorias = useMemo(() => {
    const set = new Set<string>();
    productos.forEach((p) => { if (p.categoria) set.add(p.categoria); });
    return Array.from(set).sort();
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const passGrupo     = !grupoActivo     || p.grupo     === grupoActivo;
      const passCategoria = !categoriaActiva || p.categoria === categoriaActiva;
      const passAereo     = !soloAereo       || p.origen    === "importado_aereo";
      const passAsiatico  = !soloAsiatico    || (p.etiquetas && p.etiquetas.split(" || ").includes("asiatico"));
      return passGrupo && passCategoria && passAereo && passAsiatico;
    });
  }, [productos, grupoActivo, categoriaActiva, soloAereo, soloAsiatico]);

  const handleGrupo = (grupo: string) => {
    setGrupoActivo(prev => prev === grupo ? null : grupo);
  };

  const handleCategoria = (cat: string | null) => {
    setCategoriaActiva(cat);
    setDesplegableOpen(false);
  };

  const hayFiltros = grupoActivo || categoriaActiva || soloAereo || soloAsiatico;

  const limpiarFiltros = () => {
    setGrupoActivo(null);
    setCategoriaActiva(null);
    setSoloAereo(false);
    setSoloAsiatico(false);
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

          {/* Botones de GRUPO */}
          {grupos.map((grupo) => (
            <button
              key={grupo}
              onClick={() => handleGrupo(grupo)}
              className={`filtroBtn ${grupoActivo === grupo ? "filtroBtn--activo" : "filtroBtn--inactivo"}`}
            >
              {formatearCategoria(grupo)}
            </button>
          ))}

          {/* Desplegable de CATEGORIA */}
          <div className="filtroDesplegable" ref={desplegableRef}>
            <button
              className={`filtroBtn filtroDesplegable__trigger ${categoriaActiva ? "filtroBtn--activo" : "filtroBtn--inactivo"}`}
              onClick={() => setDesplegableOpen(prev => !prev)}
            >
              {categoriaActiva ? formatearCategoria(categoriaActiva) : "Categoría"}
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
                    {formatearCategoria(cat)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Boton recien llegado en avion */}
          <button
            onClick={() => setSoloAereo(prev => !prev)}
            className={`filtroBtn ${soloAereo ? "filtroBtn--activo" : "filtroBtn--inactivo"}`}
          >
            Recién llegado en avión
          </button>

          {/* Boton asiatico */}
          <button
            onClick={() => setSoloAsiatico(prev => !prev)}
            className={`filtroBtn ${soloAsiatico ? "filtroBtn--activo" : "filtroBtn--inactivo"}`}
          >
            Sabor de Asia
          </button>

          {/* Limpiar filtros */}
          {hayFiltros && (
            <button
              className="filtroBtn filtroBtn--limpiar"
              onClick={limpiarFiltros}
            >
              x Limpiar filtros
            </button>
          )}

        </div>

        {/* Contador de resultados */}
        <p className="text-sm text-gray-500 mb-3">
          {productosFiltrados.length}{" "}
          {productosFiltrados.length === 1 ? "producto" : "productos"}
          {grupoActivo     && ` · ${formatearCategoria(grupoActivo)}`}
          {categoriaActiva && ` · ${formatearCategoria(categoriaActiva)}`}
          {soloAereo       && ` · Recién llegado en avión`}
          {soloAsiatico    && ` · Un mordisco de Asia`}
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