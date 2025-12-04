import ProductoCard from "../components/ProductoCard";

export default function Producto({producto} : {producto: any}) {
    return(
        <>
            <ProductoCard producto={producto} />
        </>
    )
}