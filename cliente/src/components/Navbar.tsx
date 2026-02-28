import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Searchbar from "./Searchbar";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navLink">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      

      <Link to="/" className="navLink">Home</Link>
      <Link to="/productos" className="navLink">Productos</Link>
      <Link to="/productos-destacados" className="navLink">Destacados</Link>
      <Link to="/about"  className="navLink">Sobre Nosotros</Link>
      <Link to="/contacto" className="navLink">Contacto</Link>
      
      <Searchbar />

    </nav>
  );
}