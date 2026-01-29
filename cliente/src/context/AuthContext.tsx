import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthContextType = {
  role: number | null;
  loading: boolean;
  refreshUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  role: null,
  loading: true,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Llama al backend para obtener el rol
  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include", // 👈 importante para cookies httpOnly
      });
      const data = await res.json();
      if (res.ok) {
        setRole(data.user.role);
      }
    } catch {
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
