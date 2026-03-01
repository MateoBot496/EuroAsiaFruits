import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useGetUsuarioActual } from "../hooks/useGetUsuarioActual";
import useUsuarioPorId from "../hooks/useUsuarioPorId";

export default function AdminNavbar() {
  const { me, loading: loadingMe } = useGetUsuarioActual();
  
  // ✅ Hook al nivel superior, solo pasamos me?.id
  const { usuario, loading: loadingUsuario } = useUsuarioPorId(me?.id);

  if (loadingMe || loadingUsuario) return <div>Cargando...</div>;

  return (
    <nav className="adminNavbar">
      <Link to="/admin" className="navLink">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <p>
        Bienvenido, usuario: {usuario?.email || "desconocido"}
      </p>
    </nav>
  );
}