import type { JSX } from "react";
import { Link } from "react-router-dom";
import useProductosDestacados from "../hooks/useProductosDestacados";
import ProductoCard from "../components/ProductoCard";

function ProductosDestacados(): JSX.Element {
  const { productos, loading } = useProductosDestacados();

  if (loading) {
    return (
      <div className="productos">
        <div className="pt-10 text-center">Cargando productos destacados...</div>
      </div>
    );
  }

  return (
    <div className="productos">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="destacadosHero">
        <span className="destacadosHero__badge">✦ Selección especial</span>
        <h1 className="destacadosHero__title">Productos Destacados</h1>
        <p className="destacadosHero__subtitle">
          Una cuidadosa selección de lo mejor de nuestra temporada,
          elegida por calidad, origen y sabor excepcional.
        </p>
      </div>

      {/* ── CONTADOR ─────────────────────────────────────────────────────── */}
      <div className="destacadosSubheader">
        <p className="destacadosSubheader__count">
          {productos.length} {productos.length === 1 ? "producto destacado" : "productos destacados"}
        </p>
        <Link to="/productos" className="destacadosSubheader__link">
          Ver todos los productos →
        </Link>
      </div>

      {/* ── GRID ─────────────────────────────────────────────────────────── */}
      {productos.length === 0 ? (
        <div className="destacadosEmpty">
          <p>No hay productos destacados en este momento.</p>
          <Link to="/productos" className="saberMasButton" style={{ textDecoration: "none", display: "inline-block", marginTop: "2vh" }}>
            Ver todos los productos
          </Link>
        </div>
      ) : (
        <div className="productos-content">
          {productos.map((producto) => (
            <Link
              to={`/producto/${producto.id_producto}`}
              key={producto.id_producto}
              className="destacadosCard__wrapper block h-full"
            >
              <div className="destacadosCard__badge">✦ Destacado</div>
              <ProductoCard producto={producto} simple />
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}

export default ProductosDestacados;
