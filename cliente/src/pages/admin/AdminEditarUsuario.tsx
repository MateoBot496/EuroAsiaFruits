import { useParams } from "react-router-dom";
import useUsuarioPorId from "../../hooks/useUsuarioPorId";
import { useGetUsuarioActual } from "../../hooks/useGetUsuarioActual";
import { useState } from "react";

export default function AdminEditarUsuario() {
  const { me } = useGetUsuarioActual();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [oldPassword, setoldPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);
  const { usuario, loading, fetchUsuario } = useUsuarioPorId(id);

  const passwordChecks = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const isPasswordValid =
    passwordChecks.length && passwordChecks.uppercase && passwordChecks.number;

  const validatePassword = () => {
    const newErrors: any = {};

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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      setLoadingPass(true);

      const res = await fetch(
        `http://localhost:3000/api/admin/users/password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            newPassword: password,
            oldPassword: oldPassword,
            changedBy: (me as any)?.id,
          }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Contraseña actualizada ✅");

      setShowModal(false);
      setPassword("");
      setRepeatPassword("");
      setErrors({});
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoadingPass(false);
    }
  };

  const cambiarEstado = async () => {
    const ok = window.confirm(
      "¿Estás seguro de que deseas cambiar el estado de este usuario?",
    );
    if (!ok) return;
    if (usuario?.id === (me as any)?.id) {
      alert("No puedes cambiar el estado de tu propia cuenta.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/users/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminId: usuario?.id,
            isActive: !usuario?.is_active,
            changedBy: (me as any)?.role,
          }),
          credentials: "include", // Si usas cookies para auth
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Refrescar usuario después del cambio
      fetchUsuario();

      console.log("Estado actualizado:", data);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const Check = ({ ok, text }: any) => (
  <p className={`text-sm flex items-center gap-2 ${ok ? "text-green-600" : "text-red-500"}`}>
    {ok ? "✅" : "❌"} {text}
  </p>
);

  return (
    
    <div>
        {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">

      <h2 className="text-xl font-bold mb-4">
        Cambiar contraseña
      </h2>

      <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
        
        {(me as any)?.id == id && (
          <div>
            
          <p className="text-red-500 text-sm">
            Estás cambiando tu propia contraseña. Asegúrate de recordar la nueva contraseña para no perder el acceso a tu cuenta.
          </p>
          <input
            type="password"
            placeholder="Antigua contraseña"
            className="border p-2 rounded w-full"
            value={oldPassword}
            onChange={(e) => setoldPassword(e.target.value)}
          />
          
          </div>
        )}

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="border p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* CHECKLIST */}
          <div className="mt-2 space-y-1">
            <Check ok={passwordChecks.length} text="Mínimo 6 caracteres" />
            <Check ok={passwordChecks.uppercase} text="Al menos una mayúscula" />
            <Check ok={passwordChecks.number} text="Al menos un número" />
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* REPEAT */}
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

        {/* BOTONES */}
        <div className="flex justify-between mt-2">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loadingPass || !isPasswordValid || password !== repeatPassword}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loadingPass ? "Guardando..." : "Guardar"}
          </button>
        </div>

      </form>
    </div>
  </div>
)}
      <h1>Admin - Editar Usuario</h1>
      {loading ? (
        <p>Cargando usuario...</p>
      ) : usuario ? (
        <div className="p-3 flex flex-col items-center border rounded bg-gray-100">
          <p>Email: {usuario.email}</p>
          <p>Role: {usuario.role === 1 ? "Superadmin" : "Admin"}</p>
          <p>Contraseña: Protegida</p>
          <button
            className="border-2 p-4 bg-blue-200 cursor-pointer"
            onClick={() => setShowModal(true)}
            >
            Cambiar contraseña
            </button>
          <p>Estado: {usuario.is_active === 1 ? "Activo" : "Inactivo"}</p>
          <button
            className="border-2 p-4 bg-red-200 pointer-cursor"
            onClick={() => cambiarEstado()}
          >
            {" "}
            Cambiar estado{" "}
          </button>
          <p>
            Created by:{" "}
            {usuario.created_by ? usuario.created_by : "No definido"}
          </p>
          {/* Aquí iría el formulario para editar el usuario, prellenado con los datos actuales */}
        </div>
      ) : (
        <p>Usuario no encontrado.</p>
      )}
    </div>
  );
}
