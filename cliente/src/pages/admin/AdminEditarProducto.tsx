import { useParams } from "react-router-dom";
import ProductoCard from "../../components/ProductoCard";
import useProductoPorId from "../../hooks/useProductoPorId";
import { useEffect, useMemo, useState } from "react";
import { useCatalogos } from "../../hooks/useCatalogos";
import { useActiveCatalogos } from "../../hooks/useActiveCatalogos";

export default function AdminEditarProducto() {
  const { catalogos } = useActiveCatalogos();
  const [msg, setMsg] = useState("");

  const { id_producto } = useParams();
  const { producto, loading } = useProductoPorId(id_producto);

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
    destacado: producto?.destacado || 0,

    id_envase: [] as number[],
    id_etiqueta: [] as number[],
  });

  const payload = useMemo(() => {
    return {
      referencia: form.referencia,
      nombre: form.nombre,
      nombre_ingles: form.nombre_ingles,
      descripcion: form.descripcion,
      id_grupo: form.id_grupo || null,
      id_categoria: form.id_categoria || null,
      id_origen: form.id_origen || null,
      url_imagen: form.url_imagen,
      envases: form.id_envase || [], // 👈 directamente el array
      etiquetas: form.id_etiqueta || [],
    };
  }, [form]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });

    console.log(form.destacado);
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
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      const res2 = await fetch(
        `http://localhost:3000/api/admin/productos/${id_producto}/disponible`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ disponible: form.disponible }),
        },
      );

      const data2 = await res2.json();

      if (!res2.ok) throw new Error(data2.message);

      const res3 = await fetch(
        `http://localhost:3000/api/admin/productos/${id_producto}/destacado`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ destacado: form.destacado }),
        },
      );

      const data3 = await res3.json();

      if (!res3.ok) throw new Error(data3.message);

      setMsg("✅ Producto modificado!");
      if (res.ok) {
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

    const envasesIds = producto.envases_ids
      ? producto.envases_ids.split(",").map(Number)
      : [];

    const etiquetasIds = producto.etiquetas_ids
      ? producto.etiquetas_ids.split(",").map(Number)
      : [];

    setForm({
      referencia: producto.referencia,
      nombre: producto.nombre,
      nombre_ingles: producto.nombre_ingles,
      descripcion: producto.descripcion,

      id_grupo: grupo?.id_grupo?.toString() ?? "",
      id_categoria: categoria?.id_categoria?.toString() ?? "",
      id_origen: origen?.id_origen?.toString() ?? "",

      id_envase: envasesIds,
      id_etiqueta: etiquetasIds,

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

        <label className="font-medium">Envases</label>
        <div className="grid gap-2 grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]">
          {catalogos?.envases.map((env) => {
            const isChecked = form.id_envase.includes(env.id_envase!);

            return (
              <label
                key={env.id_envase}
                className={`flex items-center gap-2 p-2 border rounded-xl cursor-pointer transition-colors
          ${isChecked ? "bg-blue-100 border-blue-400" : "hover:bg-gray-100"}
        `}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                  checked={isChecked}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setForm((prev) => ({
                      ...prev,
                      id_envase: checked
                        ? [...prev.id_envase, env.id_envase!]
                        : prev.id_envase.filter((id) => id !== env.id_envase),
                    }));
                  }}
                />
                <span className="text-sm">{env.descripcion}</span>
              </label>
            );
          })}
        </div>

        <label className="font-medium">Etiquetas</label>
        <div className="grid gap-2 grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]">
          {catalogos?.etiquetas.map((et) => {
            const isChecked = form.id_etiqueta.includes(et.id_etiqueta!);

            return (
              <label
                key={et.id_etiqueta}
                className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors
          ${isChecked ? "bg-green-100 border-green-400" : "hover:bg-gray-100"}
        `}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-green-600"
                  checked={isChecked}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setForm((prev) => ({
                      ...prev,
                      id_etiqueta: checked
                        ? [...prev.id_etiqueta, et.id_etiqueta!]
                        : prev.id_etiqueta.filter(
                            (id) => id !== et.id_etiqueta,
                          ),
                    }));
                  }}
                />
                <span className="">{et.nombre}</span>
              </label>
            );
          })}
        </div>

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
