import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

type FormState = {
  productoNombre: string;
  productoReferencia: string;
  nombreCliente: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
};

type Props = {
  open: boolean;
  onClose: () => void;

  productoNombre: string;
  productoReferencia: string;

  // false => NO muestra Nombre/Referencia en el formulario
  showProductoFields?: boolean;

  // para EmailJS
  emailjsServiceId?: string;
  emailjsTemplateId?: string;
  emailjsPublicKey?: string;
};

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function FormularioContacto({
  open,
  onClose,
  productoNombre,
  productoReferencia,
  showProductoFields = false,
  emailjsServiceId,
  emailjsTemplateId,
  emailjsPublicKey,
}: Props): JSX.Element | null {
  const initialForm: FormState = useMemo(
    () => ({
      productoNombre,
      productoReferencia,
      nombreCliente: "",
      email: "",
      telefono: "",
      empresa: "",
      mensaje: "",
    }),
    [productoNombre, productoReferencia],
  );

  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setOkMsg(null);
      setErrMsg(null);
      setSending(false);
    }
  }, [open, initialForm]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const validate = (): string | null => {
    if (!form.nombreCliente.trim()) return "Por favor, indica tu nombre.";
    if (!form.email.trim()) return "Por favor, indica tu email.";
    if (!isValidEmail(form.email)) return "El email no es válido.";
    if (!form.mensaje.trim()) return "Por favor, escribe tu mensaje.";
    return null;
  };

  const sendByEmailJS = async () => {
    const sid =
      emailjsServiceId || (import.meta.env.VITE_EMAILJS_SERVICE_ID as string);
    const tid =
      emailjsTemplateId || (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string);
    const pkey =
      emailjsPublicKey || (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string);

    if (!sid || !tid || !pkey) {
      throw new Error(
        "Falta configuración EmailJS (Service/Template/Public Key).",
      );
    }

    const templateParams = {
      productoNombre: form.productoNombre,
      productoReferencia: form.productoReferencia,
      nombreCliente: form.nombreCliente.trim(),
      email: form.email.trim(),
      telefono: form.telefono.trim(),
      empresa: form.empresa.trim(),
      mensaje: form.mensaje.trim(),
    };

    await emailjs.send(sid, tid, templateParams, { publicKey: pkey });
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
      await sendByEmailJS();
      setOkMsg("Mensaje enviado. Te contactaremos lo antes posible.");
    } catch (err: any) {
      setErrMsg(err?.message || "Error enviando el mensaje.");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

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
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100"
            type="button"
            disabled={sending}
          >
            Cerrar
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {/* Nombre/Referencia ocultos si showProductoFields=false */}
          {showProductoFields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Nombre
                </label>
                <input
                  value={form.productoNombre}
                  readOnly
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Referencia
                </label>
                <input
                  value={form.productoReferencia}
                  readOnly
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}

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
              onClick={onClose}
              className="rounded-xl px-4 py-2 border border-gray-300 text-gray-800 hover:bg-gray-50"
              disabled={sending}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl px-5 py-2 bg-black text-white hover:opacity-90 disabled:opacity-50"
              disabled={sending}
            >
              {sending ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
