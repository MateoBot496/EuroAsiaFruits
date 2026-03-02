import { Link } from "react-router-dom"
import { useGetUsuarioActual } from "../hooks/useGetUsuarioActual"

export default function AdminSidebar() {
    const { me } = useGetUsuarioActual()

    const isAdmin = me?.role === 0
    const userId = me?.id

    return (
        <div className="bg-gray-100 h-full p-4 w-full border-r-2">
            <h2 className="text-xl font-semibold mb-4">
                Sidebar de Administración
            </h2>

            <ul className="space-y-2">
                <li>
                    <Link to="/admin/productos/todos" className="text-blue-900 hover:underline">
                        Listar productos
                    </Link>
                </li>
                <li>
                    <Link to="/admin/productos/crear" className="text-blue-900 hover:underline">
                        Crear productos
                    </Link>
                </li>

                <hr />

                <li>
                    <Link to="/admin/categorias" className="text-blue-900 hover:underline">
                        Categorías
                    </Link>
                </li>
                <li>
                    <Link to="/admin/origenes" className="text-blue-900 hover:underline">
                        Orígenes
                    </Link>
                </li>
                <li>
                    <Link to="/admin/grupos" className="text-blue-900 hover:underline">
                        Grupos
                    </Link>
                </li>
                <li>
                    <Link to="/admin/envases" className="text-blue-900 hover:underline">
                        Envases
                    </Link>
                </li>
                <li>
                    <Link to="/admin/etiquetas" className="text-blue-900 hover:underline">
                        Etiquetas
                    </Link>
                </li>
            </ul>

            {/* Solo admins NO básicos (superadmin, etc.) */}
            {!isAdmin && (
                <ul className="mt-6">
                    <li>
                        <Link to="/admin/usuarios/todos" className="text-red-600 hover:underline">
                            Ver usuarios
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/usuarios/crear" className="text-red-600 hover:underline">
                            Crear usuario
                        </Link>
                    </li>
                </ul>
            )}

            {/* Solo admin básico */}
            {isAdmin && userId && (
                <ul className="mt-6">
                    <li>
                        <Link to={`/admin/usuario/${userId}`} className="text-red-600 hover:underline">
                            Cambiar tu contraseña
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}