const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Página no encontrada</p>
      <a href="/" className="text-blue-600 underline">
        Volver al inicio
      </a>
    </div>
  );
};

export default NotFound;
