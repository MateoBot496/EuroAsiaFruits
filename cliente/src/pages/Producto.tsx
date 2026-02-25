import type { JSX } from "react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProductoPorId from "../hooks/useProductoPorId";
import { formatLabel } from "../utils/formatLabel";

type ContactForm = {
  nombre: string; // prellenado (readOnly)
  referencia: string; // prellenado (readOnly)
  nombreCliente: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
};

export default function Producto(): JSX.Element {
  const { id } = useParams();
  const { producto, loading } = useProductoPorId(id);

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const initialForm: ContactForm = useMemo(
    () => ({
      nombre: producto?.nombre ? formatLabel(producto.nombre) : "",
      referencia: producto?.referencia ?? "",
      nombreCliente: "",
      email: "",
      telefono: "",
      empresa: "",
      mensaje: "",
    }),
    [producto]
  );

  const [form, setForm] = useState<ContactForm>(initialForm);

  const openModal = () => {
    setErrMsg(null);
    setOkMsg(null);
    setForm(initialForm);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const onChange =
    (key: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const validate = (): string | null => {
    if (!form.nombreCliente.trim()) return "Por favor, indica tu nombre.";
    if (!form.email.trim()) return "Por favor, indica tu email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "El email no es válido.";
    if (!form.mensaje.trim()) return "Por favor, escribe tu mensaje.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg(null);
    setOkMsg(null);

    const v = validate();
    if (v) {
      setErrMsg(v);
      return;
    }

    setSending(true);
    try {
      const r = await fetch("/api/contacto/producto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!r.ok) {
        const data = await r.json().catch(() => null);
        throw new Error(data?.message || "No se pudo enviar tu consulta.");
      }

      setOkMsg("Mensaje enviado. Te contactaremos lo antes posible.");
    } catch (err: any) {
      setErrMsg(err?.message || "Error enviando el mensaje.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  const nombreUI = formatLabel(producto.nombre);
  const descUI = producto.descripcion ? formatLabel(producto.descripcion) : "";

  return (
    <div className="w-full flex justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-6">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-50">
                {producto.url_imagen ? (
                  <img
                    src={producto.url_imagen}
                    alt={nombreUI}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900">{nombreUI}</h1>

              {descUI && (
                <p className="mt-4 text-gray-700 leading-relaxed">{descUI}</p>
              )}

              <div className="mt-4 text-gray-700 leading-relaxed">
                {producto.referencia && (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Referencia:
                    </span>{" "}
                    {producto.referencia}
                  </div>
                )}

                {producto.origen && (
                  <div>
                    <span className="font-semibold text-gray-900">Origen:</span>{" "}
                    {formatLabel(producto.origen)}
                  </div>
                )}

                {producto.envases && (
                  <div>
                    <span className="font-semibold text-gray-900">Envase:</span>{" "}
                    {formatLabel(producto.envases)}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-8 flex justify-start">
                <button
                  onClick={openModal}
                  className="
                    rounded-xl px-6 py-3
                    font-semibold
                    bg-black text-white
                    hover:bg-gray-800
                    transition
                  "
                >
                  Consultar este producto
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/productos" className="text-blue-500 underline">
            Volver a Productos
          </Link>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Consulta de producto
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Completa tus datos y te contactamos.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100"
                type="button"
                disabled={sending}
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-900">
                    Nombre
                  </label>
                  <input
                    value={form.nombre}
                    readOnly
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900">
                    Referencia
                  </label>
                  <input
                    value={form.referencia}
                    readOnly
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-900">
                    Tu nombre
                  </label>
                  <input
                    value={form.nombreCliente}
                    onChange={onChange("nombreCliente")}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    placeholder="Nombre y apellidos"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900">
                    Empresa (opcional)
                  </label>
                  <input
                    value={form.empresa}
                    onChange={onChange("empresa")}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    placeholder="Nombre de la empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-900">
                    Email
                  </label>
                  <input
                    value={form.email}
                    onChange={onChange("email")}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900">
                    Teléfono (opcional)
                  </label>
                  <input
                    value={form.telefono}
                    onChange={onChange("telefono")}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    placeholder="+34 ..."
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Mensaje
                </label>
                <textarea
                  value={form.mensaje}
                  onChange={onChange("mensaje")}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Indica cantidad aproximada, destino, fecha, dudas, etc."
                />
              </div>

              {errMsg && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                  {errMsg}
                </div>
              )}
              {okMsg && (
                <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
                  {okMsg}
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl px-4 py-2 border border-gray-300 text-gray-800 hover:bg-gray-50"
                  disabled={sending}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl px-5 py-2 bg-black text-white hover:opacity-90"
                  disabled={sending}
                >
                  {sending ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}