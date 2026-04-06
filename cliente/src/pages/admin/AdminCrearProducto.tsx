import { useState } from "react";
import { useCatalogos } from "../../hooks/useCatalogos";
import { useActiveCatalogos } from "../../hooks/useActiveCatalogos";

export default function AdminCrearProducto() {
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const { catalogos } = useActiveCatalogos();
  const [form, setForm] = useState({
    referencia: "",
    nombre: "",
    nombre_ingles: "",
    descripcion: "",
    id_grupo: "",
    id_categoria: "",
    id_origen: "",
    url_imagen: "",
    disponible: 1,
    destacado: 0,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked ? 1 : 0
          : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      let filename = form.url_imagen; // si no suben imagen nueva, se queda vacío

      // PASO 1: subir imagen si hay una seleccionada
      if (imagenFile) {
        const formData = new FormData();
        formData.append("imagen", imagenFile);
        formData.append("nombre", form.nombre || "producto");

        const resImg = await fetch("http://localhost:3000/api/admin/images/producto", {
          method: "POST",
          credentials: "include",
          body: formData, // NO pongas Content-Type, el browser lo pone solo con el boundary
        });

        const dataImg = await resImg.json();
        if (!resImg.ok) throw new Error(dataImg.message);
        filename = dataImg.filename;
      }

      // PASO 2: crear producto con el filename
      const res = await fetch("http://localhost:3000/api/admin/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, url_imagen: filename }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMsg("✅ Producto creado!");
      setForm({ referencia: "", nombre: "", nombre_ingles: "", descripcion: "",
        id_grupo: "", id_categoria: "", id_origen: "", url_imagen: "",
        disponible: 1, destacado: 0 });
      setImagenFile(null);
      setPreview("");

    } catch (err: any) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagenFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Crear Nuevo Producto
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          name="referencia"
          placeholder="Referencia *"
          value={form.referencia}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          name="nombre"
          placeholder="Nombre *"
          value={form.nombre}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          name="nombre_ingles"
          placeholder="Nombre inglés"
          value={form.nombre_ingles}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label className="font-medium">Imagen del producto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImagenChange}
          className="border p-2 rounded"
        />
        {preview && (
          <img src={preview} alt="Preview" className="h-40 object-contain rounded border" />
        )}

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

        <label className="flex gap-2">
          <input
            type="checkbox"
            name="disponible"
            checked={form.disponible === 1}
            onChange={handleChange}
          />
          Disponible
        </label>

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
          {loading ? "Creando..." : "Crear Producto"}
        </button>

        {msg && (
          <p className="font-medium">
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}
