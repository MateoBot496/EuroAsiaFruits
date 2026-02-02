export default async function deleteProducto(id_producto: number) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/productos/${id_producto}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }
    return true;
  } catch (error) {
    console.error("Error en deleteProducto:", error);
    throw error;
  }
}
