export default function AdminSidebar(){
    return(
        <div className="bg-gray-100 min-h-[90dvh] p-4 w-full border-r-2">
            <h2 className="text-xl font-semibold mb-4">Sidebar de Administración</h2>

            <ul className="space-y-2">
                <li>
                    <a href="/admin/productos/todos" className="text-blue-900 hover:underline">Listar productos</a>
                </li>
                <li>
                    <a href="/admin/productos/crear" className="text-blue-900 hover:underline">Crear productos</a>
                </li>
                <li>
                    <a href="/admin/categorias" className="text-blue-900 hover:underline">Categorias</a>
                </li>
                <li>
                    <a href="/admin/origenes" className="text-blue-900 hover:underline">Orígenes</a>
                </li>
                <li>
                    <a href="/admin/grupos" className="text-blue-900 hover:underline">Grupos</a>
                </li>
                <li>
                    <a href="/admin/envases" className="text-blue-900 hover:underline">Envases</a>
                </li>
                <li>
                    <a href="/admin/etiquetas" className="text-blue-900 hover:underline">Etiquetas</a>
                </li>

            </ul>

            <ul>
                <li className="mt-6">
                    <a href="/admin/usuarios/todos" className="text-red-600 hover:underline">Ver usuarios</a>
                </li>
                <li>
                    <a href="/admin/usuarios/crear" className="text-red-600 hover:underline">Crear usuario</a>
                </li>
                <li>
                    <a href="/admin/usuario/:id_usuario" className="text-red-600 hover:underline">Editar usuario</a>
                </li>
            </ul>
            
        </div>
    )
}