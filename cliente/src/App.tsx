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

function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");

  return (
    <>
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
            path="/admin/*"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
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
