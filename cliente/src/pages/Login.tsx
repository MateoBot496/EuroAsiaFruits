import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 cookies
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // refresca el usuario en el contexto
      await refreshUser();

      // redirección
      navigate("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center ">
      
        <h1>Admin Login</h1>
        <h2>superadmin@euroasia.com - superadmin123</h2>
        <form onSubmit={handleSubmit} className="flex flex-col border-2 p-4 gap-2 rounded-md">

        <input
          className="border-1 rounded-md p-1"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
        className="border-1 rounded-md p-1"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading} className="loginSubmitButton">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
    
  );
}
