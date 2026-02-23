import type { JSX } from "react";
import useProductos from "../hooks/useProductos";
import ProductoCard from "../components/ProductoCard";
import { Link } from "react-router-dom";

function Productos(): JSX.Element {
    const {productos, loading} = useProductos();
    return (
        <>

            <div className="productos">
                
                
                <div className="border-b-2 border-gray-300 mb-10 pt-5 flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Nuestros Productos
                    </h1>
                    <div className="filtros w-full flex gap-5 mb-5">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Frutas Exóticas
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Setas
                        </button>
                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                            Frutas Orgánicas
                        </button>
                    </div>
                </div>
                <div className="productos-content">

                    

                    {productos.map((producto) => (
                        <Link to={`/producto/${producto.id_producto}`} key={producto.id_producto} >
                            <ProductoCard key={producto.id_producto} producto={producto} />
                        </Link>
                        )
                    )}
                    
                </div>
                
            </div>
        </>
    )

}
export default Productos;