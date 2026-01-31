import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { type JSX } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import About from "./pages/About";
import Producto from "./pages/Producto";
import Admin from "./pages/Admin";
import AdminNavbar from "./components/AdminNavbar";
import { AdminRoute } from "./components/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import LoginRoute from "./components/LoginRoute";
import AdminTodosProductos from "./pages/admin/AdminTodosProductos";
import AdminHome from "./pages/admin/AdminHome";
import AdminCrearProducto from "./pages/admin/AdminCrearProducto";

function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");

  return (
    <div className="h-full flex flex-col">
      {!hideNavbar && <Navbar />}
      {hideNavbar && <AdminNavbar />}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/about" element={<About />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route
            path="/login"
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          >
            <Route index element={<AdminHome />} />

            <Route path="productos/todos" element={<AdminTodosProductos />} />
            <Route path="productos/crear" element={<AdminCrearProducto />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
