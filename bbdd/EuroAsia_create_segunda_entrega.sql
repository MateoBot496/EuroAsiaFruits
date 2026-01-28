
DROP DATABASE IF EXISTS EUROASIA;

CREATE DATABASE EUROASIA
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE EUROASIA;

-- =========================================================
-- TABLAS DE CATÁLOGO (productos, grupos, categorias, origenes, etiquetas, 
-- envases, productos_envases, productos_etiquetas)
-- =========================================================

CREATE TABLE grupos (
  id_grupo INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

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

-- =========================================================
-- TABLAS DE ADMIN (admin_users, admin_refresh_tokens)
-- =========================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id              CHAR(36) NOT NULL,
  email           VARCHAR(254) NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,

-- la contraseña lleva un cifrado con sistema bcrypt (hash+salt). Combinando los dos es bastante segura.
-- hash: cifra la contraseña en otros caracteres
-- salt: añade un elemento random a la contraseña generada por la persona. 

  role            TINYINT UNSIGNED NOT NULL DEFAULT 0,
  is_active       TINYINT(1) NOT NULL DEFAULT 1,

-- role: 0=ADMIN, 1=SUPERADMIN
-- is_active: define si tiene permiso de acceso o no.

  failed_attempts INT NOT NULL DEFAULT 0,
  locked_until    DATETIME(3) NULL,
-- cuenta cuántas veces intentó acceder el usuario. Si falla mucho, se le bloquea (de forma exponencial) para evitar ataques a lo bruto.

  last_login_at   DATETIME(3) NULL,
  created_at      DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at      DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                                 ON UPDATE CURRENT_TIMESTAMP(3),
  created_by      CHAR(36) NULL,
-- mínimo para hacer los logs de auditoría.

  PRIMARY KEY (id),
  UNIQUE KEY uk_admin_email (email),
  KEY idx_admin_role (role),
  KEY idx_admin_active (is_active),

-- unique key para que no haya emails duplicados

-- para saber quién creó a cada admin. ON DELETE SET NULL para que, si se borra al admin primero, no se borre al admin creado.
  CONSTRAINT fk_admin_created_by
    FOREIGN KEY (created_by) REFERENCES admin_users(id)
    ON DELETE SET NULL,

-- delimita el booleano del admin role, para evitar números raros.
  CONSTRAINT chk_admin_role
    CHECK (role IN (0, 1))
) ENGINE=InnoDB;

DELIMITER $$
-- Normalizar email a minúsculas/trim para consistencia
CREATE TRIGGER trg_admin_email_normalize_bi
BEFORE INSERT ON admin_users
FOR EACH ROW
BEGIN
  SET NEW.email = LOWER(TRIM(NEW.email));
END$$

CREATE TRIGGER trg_admin_email_normalize_bu
BEFORE UPDATE ON admin_users
FOR EACH ROW
BEGIN
  SET NEW.email = LOWER(TRIM(NEW.email));
END$$

DELIMITER ;

-- =========================================
-- Refresh tokens (hash + revocación)
-- =========================================
-- Guardamos solo el token_hash (es decir, solo el cifrado) para poder revocar.
-- Un admin puede tener varios refresh tokens (varios dispositivos).

CREATE TABLE IF NOT EXISTS admin_refresh_tokens (
  id            CHAR(36) NOT NULL,
  admin_user_id CHAR(36) NOT NULL,

  token_hash    VARCHAR(255) NOT NULL,

  issued_at     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  expires_at    DATETIME(3) NOT NULL,
  revoked_at    DATETIME(3) NULL,
  
-- establece caducidad del token.

  user_agent    VARCHAR(255) NULL,
  ip_address    VARCHAR(45) NULL,

  PRIMARY KEY (id),
  KEY idx_rt_admin (admin_user_id),
  KEY idx_rt_expires (expires_at),
-- acelera: trae todos los tokens de un usuario, y revoca todos los tokens expirados.

  CONSTRAINT fk_rt_admin
    FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
    ON DELETE CASCADE
-- si borras un admin, se borran sus tokens. No quedan tokens huérfanos sin admins.
) ENGINE=InnoDB;

-- (Opcional pero útil) Evitar duplicados del mismo token_hash (por seguridad/limpieza)
CREATE UNIQUE INDEX uk_rt_token_hash ON admin_refresh_tokens(token_hash);


-- =========================================================
-- USUARIOS MySQL (2 cuentas: public / admin)
-- =========================================================
DROP USER IF EXISTS 'euroasia_public'@'%';
DROP USER IF EXISTS 'euroasia_admin'@'%';

CREATE USER 'euroasia_public'@'%' IDENTIFIED BY '12345678';
CREATE USER 'euroasia_admin'@'%'  IDENTIFIED BY '12345678';


-- =========================================================
-- PERMISOS // GRANTS
-- Creamos dos tipos de usuarios:
--   - public: solo lectura del catálogo
--   - admin: lectura + escritura completa (catálogo + auth)
-- =========================================================

-- PUBLIC: SOLO LECTURA del catálogo (NO puede leer admin_users / admin_refresh_tokens)
GRANT SELECT ON EUROASIA.productos TO 'euroasia_public'@'%';
GRANT SELECT ON EUROASIA.grupos TO 'euroasia_public'@'%';
GRANT SELECT ON EUROASIA.categorias TO 'euroasia_public'@'%';
GRANT SELECT ON EUROASIA.origenes TO 'euroasia_public'@'%';
GRANT SELECT ON EUROASIA.etiquetas TO 'euroasia_public'@'%';
GRANT SELECT ON EUROASIA.productos_etiquetas TO 'euroasia_public'@'%';
GRANT SELECT ON EUROASIA.envases TO 'euroasia_public'@'%';
GRANT SELECT ON EUROASIA.productos_envases TO 'euroasia_public'@'%';

-- ADMIN: lectura + escritura completa (catálogo + auth)
GRANT SELECT, INSERT, UPDATE, DELETE
  ON EUROASIA.*
  TO 'euroasia_admin'@'%';

FLUSH PRIVILEGES;

