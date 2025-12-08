import { useEffect, useRef, useState } from "react";
import type Producto from "../interfaces/productoInterface";

export default function useSearchBar({ searchTerm }: { searchTerm: string }) {
  const [term, setTerm] = useState(searchTerm);
  const [resultado, setResultado] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ref para debounce timeout y para el AbortController actual
  const debounceRef = useRef<number | null>(null);
  const abortCtrlRef = useRef<AbortController | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    // limpiamos cualquier timeout anterior
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    // si está vacío, limpiamos y no hacemos fetch
    if (term.trim() === "") {
      // cancelar fetch en curso si existe
      if (abortCtrlRef.current) {
        abortCtrlRef.current.abort();
        abortCtrlRef.current = null;
      }

      setResultado([]);
      setLoading(false);
      return;
    }

    // debounce: esperar 300ms desde la última tecla
    debounceRef.current = window.setTimeout(() => {
      // cancelar petición previa si existe
      if (abortCtrlRef.current) {
        abortCtrlRef.current.abort();
      }

      const controller = new AbortController();
      abortCtrlRef.current = controller;

      setLoading(true);

      (async () => {
        try {
          const res = await fetch(
            "http://localhost:3000/api/public/productos/buscar?search=" +
              encodeURIComponent(term),
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error(`Error del servidor: ${res.status}`);
          }

          const data: Producto[] = await res.json();
          setResultado(data);
        } catch (err: any) {
          if (err.name === "AbortError") {
            // petición cancelada: no es un error real que queramos mostrar
            // console.log("fetch abortado");
          } else {
            console.error(err);
          }
        } finally {
          // sólo dejar loading = false si este controller sigue siendo el actual
          if (abortCtrlRef.current === controller) {
            setLoading(false);
            // NO uses console.log(resultado) aquí — puede estar desfasado.
          }
        }
      })();
    }, 300);

    // cleanup cuando cambie term o se desmonte
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
      // no abortar aquí necesariamente — lo hacemos al iniciar nueva petición arriba
    };
  }, [term]);



  return { resultado, loading, handleChange, term };
}
