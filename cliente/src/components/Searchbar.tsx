import { Link } from "react-router-dom";
import useSearchBar from "../hooks/useSearchBar";
import { useEffect, useState } from "react";

export default function Searchbar() {
    const { resultado, loading, handleChange, term  } = useSearchBar({searchTerm: ""});
    const [isOpen, setIsOpen] =  useState<boolean>(true);

      useEffect(() => {
          setIsOpen(true);
      }, [resultado]);

  return (
    <div>
      <div className="searchbar">

          <div className="flex justify-center align-center">
              <input
              className="searchbar__input"
              type="text"
              placeholder="Buscar productos..."
              onChange={handleChange}
            />

            <button className="searchbar__icon-right" aria-label="Buscar">
              
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round"/>
              </svg>

            </button>

          </div>
          

          
      </div>
      {
        resultado.length > 0 && term  != "" && isOpen ? (
            <div className="searchbar-results w-60 absolute z-10">
              {resultado.map((producto) => (
                
                <div key={producto.id_producto} className="searchbar-result-item hover:bg-gray-700">
                  <Link to={`/producto/${producto.id_producto}`} key={producto.id_producto} onClick={() => setIsOpen(false)}> {producto.nombre} </Link>
                  
                </div>
              ))}
            </div>
        ) : null
      }
      
    </div>
  )
}