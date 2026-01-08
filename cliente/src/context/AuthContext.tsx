
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthContextType = {
  role: string;
  loading: boolean;
  refreshUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  role: "guest",
  loading: true,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  // Llama al backend para obtener el rol
  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/auth/me", {
        credentials: "include", // 👈 importante para cookies httpOnly
      });
      if (res.ok) {
        const data = await res.json();
        setRole(data.role);
      } else {
        setRole("guest");
      }
    } catch {
      setRole("guest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ role, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
