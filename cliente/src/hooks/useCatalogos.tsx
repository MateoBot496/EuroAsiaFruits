import { useEffect, useState } from "react";

type CatalogoItem = {
  id_grupo?: number;
  id_categoria?: number;
  id_origen?: number;
  id_etiqueta?: number;
  id_envase?: number;
  nombre?: string;
  descripcion?: string;
};

type Catalogos = {
  grupos: CatalogoItem[];
  categorias: CatalogoItem[];
  origenes: CatalogoItem[];
  etiquetas: CatalogoItem[];
  envases: CatalogoItem[];
};

export function useCatalogos() {
  const [catalogos, setCatalogos] = useState<Catalogos | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/public/catalogos")
      .then((res) => res.json())
      .then((data) => setCatalogos(data))
      .finally();
  }, []);

  return { catalogos};
}
