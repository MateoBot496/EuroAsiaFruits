import { Link, useParams } from "react-router-dom";
import ProductoCard from "../components/ProductoCard";
import useProductoPorId from "../hooks/useProductoPorId";

export default function Producto() {
  const { id } = useParams(); // ← captura el ID desde la URL
  const {producto, loading}= useProductoPorId(id);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="w-full flex justify-center align-center p-4 flex-col items-center">
        
        <ProductoCard producto={producto} />

        <Link to="/productos" className="mt-4 text-blue-500 underline">Volver a Productos</Link>
        
    </div>

  );
}
