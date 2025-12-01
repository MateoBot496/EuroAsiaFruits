import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navLink">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      

      <Link to="/" className="navLink">Home</Link>
      <Link to="/productos" className="navLink">Productos</Link>
      <Link to="/about"  className="navLink">About</Link>
      
      
      <div className="searchbar">

        <input
          className="searchbar__input"
          type="text"
          placeholder="Buscar productos..."
        />

        <button className="searchbar__icon-right" aria-label="Buscar">
          
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round"/>
          </svg>
        </button>
      </div>

    </nav>
  );
}