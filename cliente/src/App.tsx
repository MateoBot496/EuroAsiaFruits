import { useEffect, useState, type JSX } from 'react'
import './App.css'
import Navbar from './components/Navbar'

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  // añade más propiedades si tu API devuelve más
}

function App() : JSX.Element {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/public/productos/");

        if (!res.ok) {
          throw new Error(`Error del servidor: ${res.status}`);
        }

        const data: Producto[] = await res.json();
        setProductos(data);
        console.log(productos);

      } catch (err){
        console.log(err);
      }
    }

    fetchProductos();
  }, [])

  return (
    <>
      <Navbar />
      <h1 className='text-3xl font-bold underline '> Hola mundillo </h1>
    </>
  )
}

export default App
