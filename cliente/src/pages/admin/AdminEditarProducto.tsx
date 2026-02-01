import { useParams } from "react-router-dom";
import ProductoCard from "../../components/ProductoCard";
import useProductoPorId from "../../hooks/useProductoPorId";
import { useEffect, useState } from "react";
import { useCatalogos } from "../../hooks/useCatalogos";

export default function AdminEditarProducto() {
  const { catalogos } = useCatalogos();
  const [msg, setMsg] = useState("");

  const { id_producto } = useParams();
  const { producto, loading } = useProductoPorId(id_producto);
  
  const [form, setForm] = useState({
    referencia: producto?.referencia || "",
    nombre: producto?.nombre || "",
    nombre_ingles: producto?.nombre_ingles || "",
    descripcion: producto?.descripcion || "",
    id_grupo: producto?.grupo || "",
    id_categoria: producto?.categoria || "",
    id_origen: producto?.origen || "",
    url_imagen: producto?.url_imagen || "",
    disponible: producto?.disponible || 1,
    destacado: producto?.destacado || 0,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/productos/${id_producto}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 🔥 cookies
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMsg("✅ Producto modificado!");
      if(res.ok){
        window.location.reload();
      }
    } catch (err: any) {
      setMsg("❌ " + err.message);
    } finally {
    }
  };



  useEffect(() => {
    if (!producto || !catalogos) return;

    const grupo = catalogos.grupos.find((g) => g.nombre === producto.grupo);

    const categoria = catalogos.categorias.find(
      (c) => c.nombre === producto.categoria,
    );

    const origen = catalogos.origenes.find((o) => o.nombre === producto.origen);

    setForm({
      referencia: producto.referencia,
      nombre: producto.nombre,
      nombre_ingles: producto.nombre_ingles,
      descripcion: producto.descripcion,
      id_grupo: grupo?.id_grupo ?? null,
      id_categoria: categoria?.id_categoria ?? null,
      id_origen: origen?.id_origen ?? null,
            url_imagen: producto.url_imagen
        ? producto.url_imagen.replace("http://localhost:3000/images/", "")
        : "",

      disponible: producto.disponible,
      destacado: producto.destacado,
    });
  }, [producto, catalogos]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div className="p-4 flex flex-col w-full overflow-y-hidden">
      <ProductoCard producto={producto} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
        <label> Referencia </label>
        <input
          name="referencia"
          placeholder="Referencia *"
          value={form.referencia}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <label> Nombre </label>

        <input
          name="nombre"
          placeholder="Nombre *"
          value={form.nombre}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <label> Nombre inglés </label>

        <input
          name="nombre_ingles"
          placeholder="Nombre inglés"
          value={form.nombre_ingles}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label> Descripción </label>

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        
        <label> URL imagen </label>

        <input
          name="url_imagen"
          placeholder="URL imagen"
          value={form.url_imagen}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* ===== GRUPO ===== */}
        <label className="font-medium">Grupo</label>
        <select
          name="id_grupo"
          value={form.id_grupo}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecciona un grupo</option>
          {catalogos?.grupos.map((grupo) => (
            <option
              key={grupo.id_grupo}
              value={String(grupo.id_grupo)} // 👈 importante
            >
              {grupo.nombre}
            </option>
          ))}
        </select>

        {/* ===== CATEGORÍA ===== */}
        <label className="font-medium">Categoría</label>
        <select
          name="id_categoria"
          value={form.id_categoria}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecciona una categoría</option>
          {catalogos?.categorias.map((cat) => (
            <option
              key={cat.id_categoria}
              value={String(cat.id_categoria)} // 👈 importante
            >
              {cat.nombre}
            </option>
          ))}
        </select>

        {/* ===== ORIGEN ===== */}
        <label className="font-medium">Origen</label>
        <select
          name="id_origen"
          value={form.id_origen}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecciona un origen</option>
          {catalogos?.origenes.map((origen) => (
            <option
              key={origen.id_origen}
              value={String(origen.id_origen)} // 👈 importante
            >
              {origen.nombre}
            </option>
          ))}
        </select>

        <label> Disponible </label>
        <label className="flex gap-2">
          <input
            type="checkbox"
            name="disponible"
            checked={form.disponible === 1}
            onChange={handleChange}
          />
          Disponible
        </label>

        <label> Destacado </label>
        <label className="flex gap-2">
          <input
            type="checkbox"
            name="destacado"
            checked={form.destacado === 1}
            onChange={handleChange}
          />
          Destacado
        </label>

        <button
          disabled={loading}
          className="bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Modificando..." : "Modificar Producto"}
        </button>

        {msg && <p className="font-medium">{msg}</p>}
      </form>
    </div>
  );
}
