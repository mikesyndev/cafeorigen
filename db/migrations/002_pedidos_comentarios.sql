PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido     INTEGER PRIMARY KEY AUTOINCREMENT,
  id_producto   INTEGER NOT NULL,
  id_consumidor INTEGER NOT NULL,
  fecha         DATE NOT NULL,
  estado        VARCHAR(50) NOT NULL,

  FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  FOREIGN KEY (id_consumidor) REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS comentarios (
  id_comentario INTEGER PRIMARY KEY AUTOINCREMENT,
  id_producto   INTEGER NOT NULL,
  id_usuario    INTEGER NOT NULL,
  texto         TEXT,
  calificacion  INTEGER,

  FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pedidos_id_producto
  ON pedidos (id_producto);

CREATE INDEX IF NOT EXISTS idx_pedidos_id_consumidor
  ON pedidos (id_consumidor);

CREATE INDEX IF NOT EXISTS idx_comentarios_id_producto
  ON comentarios (id_producto);

CREATE INDEX IF NOT EXISTS idx_comentarios_id_usuario
  ON comentarios (id_usuario);
