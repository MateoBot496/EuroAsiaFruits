import type { JSX } from "react";
import useProductos from "../hooks/useProductos";
import ProductoCard from "../components/ProductoCard";
import { Link } from "react-router-dom";

function Productos(): JSX.Element {
    const {productos, loading} = useProductos();
    return (
        <>

            <div className="productos">
                
                
                <h1 className="text-3xl font-bold underline "> Todos los productos </h1>
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