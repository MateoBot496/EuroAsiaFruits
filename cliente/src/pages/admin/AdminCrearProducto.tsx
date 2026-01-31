import { useState } from "react";

export default function AdminCrearProducto() {
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

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {

      const res = await fetch("http://localhost:3000/api/admin/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 cookies
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMsg("✅ Producto creado!");
      setForm({
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

    } catch (err:any) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
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

        <input
          name="url_imagen"
          placeholder="URL imagen"
          value={form.url_imagen}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="id_grupo"
          placeholder="ID grupo"
          value={form.id_grupo}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="id_categoria"
          placeholder="ID categoría"
          value={form.id_categoria}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="id_origen"
          placeholder="ID origen"
          value={form.id_origen}
          onChange={handleChange}
          className="border p-2 rounded"
        />

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
