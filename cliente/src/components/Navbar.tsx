import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Searchbar from "./Searchbar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Fila principal: logo + links desktop + hamburguesa móvil */}
      <div className="navbar__bar">
        <Link to="/" className="navLink" onClick={closeMenu}>
          <img src={logo} alt="logo" className="logo" />
        </Link>

        {/* Links visibles solo en desktop */}
        <div className="navbar__links">
          <Link to="/" className="navLink">Home</Link>
          <Link to="/productos" className="navLink">Productos</Link>
          <Link to="/destacados" className="navLink">Destacados</Link>
          <Link to="/about" className="navLink">Sobre Nosotros</Link>
          <Link to="/contacto" className="navLink">Contacto</Link>
          <Searchbar />
        </div>

        {/* Botón hamburguesa visible solo en móvil */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className={`navbar__hamburger-icon ${menuOpen ? "navbar__hamburger-icon--open" : ""}`} />
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <Link to="/" className="navLink navbar__mobile-link" onClick={closeMenu}>Home</Link>
          <Link to="/productos" className="navLink navbar__mobile-link" onClick={closeMenu}>Productos</Link>
          <Link to="/destacados" className="navLink navbar__mobile-link" onClick={closeMenu}>Destacados</Link>
          <Link to="/about" className="navLink navbar__mobile-link" onClick={closeMenu}>Sobre Nosotros</Link>
          <Link to="/contacto" className="navLink navbar__mobile-link" onClick={closeMenu}>Contacto</Link>
          <div className="navbar__mobile-search">
            <Searchbar />
          </div>
        </div>
      )}
    </nav>
  );
}