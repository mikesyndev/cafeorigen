PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario     INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre         VARCHAR(100) NOT NULL,
  correo         VARCHAR(100) NOT NULL UNIQUE,
  rol            VARCHAR(20)  NOT NULL,
  password_hash  VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS fincas (
  id_finca    INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario  INTEGER NOT NULL,
  nombre      VARCHAR(100) NOT NULL,
  ubicacion   VARCHAR(150),

  FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

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

CREATE INDEX idx_fincas_id_usuario
  ON fincas (id_usuario);

CREATE INDEX idx_productos_id_finca
  ON productos (id_finca);
