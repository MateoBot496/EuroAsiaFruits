import type { JSX } from "react";
import useProductos from "../hooks/useProductos";
import ProductoCard from "../components/ProductoCard";

function Productos(): JSX.Element {
    const {productos, loading} = useProductos();
    return (
        <>

            <div className="productos">
                
                
                <h1 className="text-3xl font-bold underline "> Hola mundillo desde Productos </h1>
                <div className="productos-content">

                    

                    {productos.map((producto) => (
                        <ProductoCard key={producto.id_producto} producto={producto} />
                        )
                    )}
                    
                </div>
                
            </div>
        </>
    )

}
export default Productos;