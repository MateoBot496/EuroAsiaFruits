import { useEffect, useState } from "react";
import { useGetUsuarioActual } from "../../hooks/useGetUsuarioActual";
import useGetUsuarioPorEmail from "../../hooks/useGetUsuarioPorEmail";

export default function AdminCrearUsuario() {
  const { me } = useGetUsuarioActual();
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const { usuario } = useGetUsuarioPorEmail(email);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordChecks = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const isPasswordValid =
    passwordChecks.length &&
    passwordChecks.uppercase &&
    passwordChecks.number;

  const validate = () => {
    const newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "El email no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!isPasswordValid) {
      newErrors.password = "La contraseña no cumple los requisitos";
    }

    if (password !== repeatPassword) {
      newErrors.repeatPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          role: 0,
          createdBy: (me as any)?.id || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al crear usuario");
      }

      alert("Usuario creado con éxito ✅");

      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setErrors({});
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 UI helper
  const Check = ({ ok, text }: any) => (
    <p className={`text-sm flex items-center gap-2 ${ok ? "text-green-600" : "text-red-500"}`}>
      {ok ? "✅" : "❌"} {text}
    </p>
  );

  return (
    <div className="mx-auto p-6 bg-white w-[60dvw] flex flex-col items-center justify-center h-[80dvh]">
      <h1 className="text-2xl font-bold mb-4">
        Admin - Crear Usuario
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        {usuario ? (
          <p className="text-red-500 text-sm">
            ⚠️ Ya existe un usuario con este email: {usuario.email}
          </p>
        ) : (
          <p className="text-green-500 text-sm">
          </p>
        )}

        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && !emailRegex.test(email) && (
            <p className="text-red-500 text-sm">Email no válido</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 🔥 CHECKLIST VISUAL */}
          <div className="mt-2 space-y-1">
            <Check ok={passwordChecks.length} text="Mínimo 6 caracteres" />
            <Check ok={passwordChecks.uppercase} text="Al menos una mayúscula" />
            <Check ok={passwordChecks.number} text="Al menos un número" />
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* REPEAT PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Repetir contraseña"
            className="border p-2 rounded w-full"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          {repeatPassword && (
            <p className={`text-sm ${password === repeatPassword ? "text-green-600" : "text-red-500"}`}>
              {password === repeatPassword ? "✅ Coinciden" : "❌ No coinciden"}
            </p>
          )}
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          disabled={loading || !isPasswordValid || password !== repeatPassword}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Creando..." : "Crear usuario"}
        </button>
      </form>
    </div>
  );
}