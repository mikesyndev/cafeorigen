import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "db", "ecommerce.sqlite");

const db = new sqlite3.Database(dbPath);

function runAsync(sql: string, params: any[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function getAsync<T = any>(sql: string, params: any[] = []): Promise<T> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row as T);
    });
  });
}

async function main() {
  try {
    console.log("Usando base de datos en:", dbPath);

    await runAsync("DELETE FROM comentarios");
    await runAsync("DELETE FROM pedidos");
    await runAsync("DELETE FROM productos");
    await runAsync("DELETE FROM fincas");
    await runAsync("DELETE FROM usuarios");

    // Usuarios
    await runAsync(
      `INSERT INTO usuarios (nombre, correo, rol, password_hash)
        VALUES (?, ?, ?, ?)`,
      ["Productor 1", "productor1@example.com", "productor", "hashedpassword1"]
    );

    await runAsync(
      `INSERT INTO usuarios (nombre, correo, rol, password_hash)
        VALUES (?, ?, ?, ?)`,
      ["Consumidor 1", "consumidor1@example.com", "consumidor", "hashedpassword2"]
    );

    const productor = await getAsync<{ id_usuario: number }>(
      "SELECT id_usuario FROM usuarios WHERE correo = ?",
      ["productor1@example.com"]
    );

    const consumidor = await getAsync<{ id_usuario: number }>(
      "SELECT id_usuario FROM usuarios WHERE correo = ?",
      ["consumidor1@example.com"]
    );

    // Finca
    await runAsync(
      `INSERT INTO fincas (id_usuario, nombre, ubicacion)
        VALUES (?, ?, ?)`,
      [productor.id_usuario, "Finca El Descanso", "Vereda La Esperanza"]
    );

    const finca = await getAsync<{ id_finca: number }>(
      "SELECT id_finca FROM fincas WHERE nombre = ?",
      ["Finca El Descanso"]
    );

    // Productos
    await runAsync(
      `INSERT INTO productos (id_finca, nombre, descripcion, foto_url, precio)
        VALUES (?, ?, ?, ?, ?)`,
      [
        finca.id_finca,
        "Café Especial 1kg",
        "Café de origen, tueste medio.",
        "/images/cafe-1kg.jpg",
        15000,
      ]
    );

    await runAsync(
      `INSERT INTO productos (id_finca, nombre, descripcion, foto_url, precio)
        VALUES (?, ?, ?, ?, ?)`,
      [
        finca.id_finca,
        "Café Molido 500g",
        "Ideal para prensa francesa.",
        "/images/cafe-500g.jpg",
        30000,
      ]
    );

    await runAsync(
      `INSERT INTO productos (id_finca, nombre, descripcion, foto_url, precio)
        VALUES (?, ?, ?, ?, ?)`,
      [
        finca.id_finca,
        "Café en grano 250g",
        "Para espresso.",
        "/images/cafe-250g.jpg",
        20000,
      ]
    );

    const producto1 = await getAsync<{ id_producto: number }>(
      "SELECT id_producto FROM productos WHERE nombre = ?",
      ["Café Especial 1kg"]
    );

    const producto2 = await getAsync<{ id_producto: number }>(
      "SELECT id_producto FROM productos WHERE nombre = ?",
      ["Café Molido 500g"]
    );

    // Pedidos
    const hoy = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    await runAsync(
      `INSERT INTO pedidos (id_producto, id_consumidor, fecha, estado)
        VALUES (?, ?, ?, ?)`,
      [producto1.id_producto, consumidor.id_usuario, hoy, "PENDIENTE"]
    );

    await runAsync(
      `INSERT INTO pedidos (id_producto, id_consumidor, fecha, estado)
        VALUES (?, ?, ?, ?)`,
      [producto2.id_producto, consumidor.id_usuario, hoy, "ENVIADO"]
    );

    // Comentarios
    await runAsync(
      `INSERT INTO comentarios (id_producto, id_usuario, texto, calificacion)
        VALUES (?, ?, ?, ?)`,
      [
        producto1.id_producto,
        consumidor.id_usuario,
        "Excelente café, sabor muy balanceado.",
        5,
      ]
    );

    await runAsync(
      `INSERT INTO comentarios (id_producto, id_usuario, texto, calificacion)
        VALUES (?, ?, ?, ?)`,
      [
        producto2.id_producto,
        consumidor.id_usuario,
        "Buen sabor pero un poco fuerte para mi gusto.",
        4,
      ]
    );

    console.log("Seed completado con éxito ✅");
  } catch (err) {
    console.error("Error ejecutando seed:", err);
  } finally {
    db.close();
  }
}

main();
