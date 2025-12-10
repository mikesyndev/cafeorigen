import { getDb } from "../index";

export type ProductoRow = {
  id_producto:number;
  id_finca: number;
  nombre: string;
  descripcion: string | null;
  foto_url: string | null;
  precio: number | null;
};

export async function getProductos(): Promise<ProductoRow[]> {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.all(
      "SELECT id_producto, nombre, descripcion, foto_url, precio FROM productos",
      (err, rows) => {
        if (err) return reject(err);
        console.log("📌 Resultado de productos:", rows);
        resolve(rows as ProductoRow[]);
      }
    );
  });
}