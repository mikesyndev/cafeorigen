PRAGMA foreign_keys = ON;

-- Tabla: Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario     INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre         VARCHAR(100) NOT NULL,
  correo         VARCHAR(100) NOT NULL UNIQUE,
  rol            VARCHAR(20)  NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
);

-- Tabla: Fincas
CREATE TABLE IF NOT EXISTS fincas (
  id_finca    INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario  INTEGER NOT NULL,
  nombre      VARCHAR(100) NOT NULL,
  ubicacion   VARCHAR(150),

  FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Tabla: Productos
CREATE TABLE IF NOT EXISTS productos (
  id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
  id_finca    INTEGER NOT NULL,
  nombre      VARCHAR(100) NOT NULL,
  descripcion TEXT,
  foto_url    VARCHAR(255),
  precio      REAL,

  FOREIGN KEY (id_finca) REFERENCES fincas (id_finca)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Tabla: Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido    INTEGER PRIMARY KEY AUTOINCREMENT,
  id_producto  INTEGER NOT NULL,
  id_consumidor INTEGER NOT NULL,
  fecha        DATE NOT NULL,
  estado       VARCHAR(50) NOT NULL,

  FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  FOREIGN KEY (id_consumidor) REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Tabla: Comentarios
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

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_fincas_id_usuario
  ON fincas (id_usuario);

CREATE INDEX IF NOT EXISTS idx_productos_id_finca
  ON productos (id_finca);

CREATE INDEX IF NOT EXISTS idx_pedidos_id_producto
  ON pedidos (id_producto);

CREATE INDEX IF NOT EXISTS idx_pedidos_id_consumidor
  ON pedidos (id_consumidor);

CREATE INDEX IF NOT EXISTS idx_comentarios_id_producto
  ON comentarios (id_producto);

CREATE INDEX IF NOT EXISTS idx_comentarios_id_usuario
  ON comentarios (id_usuario);
