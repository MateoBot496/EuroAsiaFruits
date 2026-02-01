export default interface Producto {
  id_producto: number;
  nombre: string;
  nombre_ingles: string;
  descripcion: string;
  categoria: any;
  grupo: any ;
  referencia: string;
  envases: string;
  origen: any;
  disponible: number;  // 0 o 1
  destacado: number;   // 0 o 1
  url_imagen: string | null;
}
