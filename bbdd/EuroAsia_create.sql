DROP DATABASE IF EXISTS EUROASIA;

CREATE DATABASE EUROASIA
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE EUROASIA;


-- Grupos (fruta, verdura, seta, otros)
CREATE TABLE grupos (
  id_grupo INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Categorías (hoja verde, raíz, semilla, hueso, etc.)
CREATE TABLE categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Orígenes (nacional_corporativas, nacional_proveedores, importacion_aerea, importacion_maritima)
CREATE TABLE origenes (
  id_origen INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  referencia VARCHAR(50) NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  nombre_ingles VARCHAR(100),
  descripcion TEXT,
  id_grupo INT,
  id_categoria INT,
  id_origen INT,
  url_imagen VARCHAR(500),
  disponible TINYINT(1) DEFAULT 1,
  destacado TINYINT(1) DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                      ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo)
      ON DELETE SET NULL,

  FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
      ON DELETE SET NULL,

  FOREIGN KEY (id_origen) REFERENCES origenes(id_origen)
      ON DELETE SET NULL
);


-- TABLAS DE ETIQUETAS (N-M)

CREATE TABLE etiquetas (
  id_etiqueta INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE
);

CREATE TABLE productos_etiquetas (
  id_producto INT,
  id_etiqueta INT,
  PRIMARY KEY (id_producto, id_etiqueta),

  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
      ON DELETE CASCADE,

  FOREIGN KEY (id_etiqueta) REFERENCES etiquetas(id_etiqueta)
      ON DELETE CASCADE
);

-- TABLAS DE ENVASES (N-M)

CREATE TABLE envases (
  id_envase INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(200) NOT NULL UNIQUE
);

CREATE TABLE productos_envases (
  id_producto INT,
  id_envase INT,
  PRIMARY KEY (id_producto, id_envase),

  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
      ON DELETE CASCADE,

  FOREIGN KEY (id_envase) REFERENCES envases(id_envase)
      ON DELETE CASCADE
);
