import { useParams } from "react-router-dom";
import useUsuarioPorId from "../../hooks/useUsuarioPorId";

export default function AdminEditarUsuario() {
    
    const { id } = useParams();
    const { usuario, loading, fetchUsuario } = useUsuarioPorId(id);
    return (
        <div>
            <h1>Admin - Editar Usuario</h1>
            {loading ? (
                <p>Cargando usuario...</p>
            ) : usuario ? (
                <div className="p-3 flex flex-col items-center border rounded bg-gray-100">
                    <p>Email: {usuario.email}</p>
                    <p>Role: {usuario.role === 1 ? "Superadmin" : "Admin"}</p>
                    <p>Contraseña: Protegida</p>
                    <p>Estado: {usuario.is_active === 1 ? "Activo" : "Inactivo"}</p>
                    <p>Created by: {usuario.created_by? usuario.created_by : "No definido"}</p>
                    {/* Aquí iría el formulario para editar el usuario, prellenado con los datos actuales */}
                </div>  
            ) : (
                <p>Usuario no encontrado.</p>
            )}
        </div>
    );
}