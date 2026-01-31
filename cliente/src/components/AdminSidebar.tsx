export default function AdminSidebar(){
    return(
        <div className="bg-gray-100 h-[100%] p-4 w-full border-r-2">
            <h2 className="text-xl font-semibold mb-4">Sidebar de Administración</h2>

            <ul className="space-y-2">
                <li>
                    <a href="/admin/productos/todos" className="text-blue-900 hover:underline">Listar productos</a>
                </li>
                <li>
                    <a href="/admin/productos/crear" className="text-blue-900 hover:underline">Crear productos</a>
                </li>
                <li>
                    <a href="/admin/orders" className="text-blue-900 hover:underline">Cambiar productos</a>
                </li>
                <li>
                    <a href="/admin/categories" className="text-blue-900 hover:underline">Borrar productos</a>
                </li>
            </ul>

            <ul>
                <li className="mt-6">
                    <a href="/admin/reports" className="text-red-600 hover:underline">Ver usuarios</a>
                </li>
            </ul>
            
        </div>
    )
}