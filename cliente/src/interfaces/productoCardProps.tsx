import type Producto from "./productoInterface";
export default interface ProductoCardProps {
    producto: Producto;

    // simple: lista de productos
    simple?: boolean; 
    
}