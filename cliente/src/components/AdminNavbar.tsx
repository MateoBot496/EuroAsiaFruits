import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function AdminNavbar(){
    return (
    <nav className="adminNavbar">
      <Link to="/admin" className="navLink">
        <img src={logo} alt="logo" className="logo" />
      </Link>

        <p>
            Bienvenido, usuario: 
        </p>
    </nav>
  );
}