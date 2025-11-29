import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="w-full b-2 border-black bg-blue-100 p-4 gap-4 flex justify-around items-center">
      <h1 className="text-2xl font-semibold">Navbar</h1>

      <Link to="/" className="navLink">Home</Link>
      <Link to="/productos" className="navLink">Productos</Link>
      <Link to="/about"  className="navLink">About</Link>
    </nav>
  );
}