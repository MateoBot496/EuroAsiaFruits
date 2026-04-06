USE EUROASIA;

INSERT INTO grupos (nombre) VALUES
('fruta'),
('verdura'),
('seta'),
('otros');

SELECT * from grupos;

INSERT INTO categorias (nombre) VALUES
('hoja_verde'),
('raiz'),
('tuberculo'),
('tallo'),
('aromatico'),
('citrica'),
('hueso'),
('pepita'),
('baya'),
('melon'),
('blanco'),
('marron');


SELECT * from categorias;



INSERT INTO origenes (nombre) VALUES
('importado_maritimo'),
('importado_aereo'),
('nacional_corporativas'),
('nacional_proveedores');

SELECT * from origenes;

INSERT INTO envases (descripcion) VALUES
('bolsas 100g*50 / 5kg'),
('bolsas 200g*25 / 5kg'),
('bolsas 2kg*2 / 4kg'),
('bolsas 2,5kg*2 / 5kg'),
('al vacío 250g*20 / 5kg'),
('bolsas 150g*40 / 6kg'),
('bolsas 150g*20 / 3kg'),
('400g*20p-8kg'),
('granel 2,5kg'),
('granel 2kg'),
('bandejas 800g*12'),
('bandejas 500g*16'),
('bandejas 500g*4 / 2kg'),
('bolsas 500g*20 / 10kg'),
('bandejas 500g aprox. / 5kg'),
('bandejas 500g aprox. / 3kg'),
('granel 3kg'),
('bandejas 500g aprox. / 10kg'),
('granel (500g)2kg/4kg'),
('granel 12kg aprox.'),
('bandejas 220g*20 / 4,4kg'),
('bandejas 220g*40 / 8,8kg'),
('8/9/10/11/12 piezas / 11kg'),
('8/9/10/11/12 piezas / 12kg'),
('16/18/20/22 piezas / 4,5kg'),
('32/36/40/44 piezas / 9kg'),
('bandejas 4 piezas*12'),
('8/9/10/12/14 piezas / 5kg'),
('bandejas 3 piezas*8 / 11kg'),
('granel 18-26 piezas / 4,5kg'),
('16/18/20/22 piezas / 4kg'),
('bandejas 4 piezas*12 / 12kg'),
('18-20 piezas / 4,5kg'),
('16-22 piezas / 5kg'),
('granel 18-26 piezas / 7/9kg'),
('cesta 3kg'),
('bolsas 500g*14 / 7kg'),
('granel 2,5-3,5kg aprox.'),
('10 piezas / 3,8kg'),
('granel 5kg'),
('granel 8kg aprox.'),
('granel 250g*20 piezas'),
('2 piezas*10 pack'),
('granel 300g*20'),
('granel 300g*20p'),
('granel 200g*30p'),
('granel 300h*20p'),
('granel 250g*20p'),
('granel 1kg*10 aprox.'),
('manojos 5*10 bolsas / 10kg'),
('granel 10kg'),
('granel 10kg/15kg'),
('al vacío 10kg'),
('bolsas 200g*20 / 4kg'),
('bolsas 400g*25 / 10kg'),
('granel 16kg'),
('granel 6kg'),
('20 manojos'),
('12 manojos'),
('granel 4kg'),
('granel 5kg aprox.'),
('granel 7kg'),
('granel 18kg aprox.');



SELECT * from envases;

INSERT INTO etiquetas (nombre) VALUES
('dulce'),
('agridulce'),
('suave'),
('intenso'),
('tierno'),
('jugoso'),
('fibroso'),
('crujiente'),
('carnoso'),
('tropical'),
('asiatico'),
('exotico');

SELECT * from etiquetas;

SELECT * from productos;



INSERT INTO productos 
(referencia, nombre, nombre_ingles, descripcion, id_grupo, id_categoria, id_origen, url_imagen)
VALUES

-- SETAS
('SET007', 'seta eryngii', 'king oyster mushroom', 
 'seta carnosa con textura firme y sabor suave', 
 3, (SELECT id_categoria FROM categorias WHERE nombre = 'blanco'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_corporativas'), NULL),

('SET002', 'seta shimeji blanco', 'white shimeji', 
 'seta blanca de sabor suave y textura firme', 
 3, (SELECT id_categoria FROM categorias WHERE nombre = 'blanco'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_corporativas'), NULL),

('SET003', 'seta shimeji marron', 'brown shimeji', 
 'seta marrón aromática y muy usada en cocina japonesa', 
 3, (SELECT id_categoria FROM categorias WHERE nombre = 'marron'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_corporativas'), NULL),

('SET004', 'seta shiitake', 'shiitake mushroom', 
 'seta marrón de aroma intenso y sabor umami', 
 3, (SELECT id_categoria FROM categorias WHERE nombre = 'marron'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_corporativas'), NULL),
 
('SET005', 'seta enoki', 'enoki mushroom', 
 'seta blanca fina muy usada en cocina asiática', 
 3, (SELECT id_categoria FROM categorias WHERE nombre = 'blanco'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_corporativas'), NULL),
 
('SET006', 'setas mixtas', 'mixed mushrooms', 
 'mix de setas seleccionadas para cocina asiática', 
 3, NULL, 
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_corporativas'), NULL),


-- FRUTAS
('FRU001', 'pomelo blanco', 'white pomelo', 
 'fruta cítrica grande con pulpa jugosa', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'citrica'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL),

('FRU002', 'pera nachi', 'nashi pear', 
 'pera asiática crujiente, dulce y jugosa', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'pepita'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL),

('FRU003', 'pera marron', 'singo pear', 
 'variedad asiática de piel marrón y sabor dulce', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'pepita'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL),
 
('FRU004', 'pomelo rojo', 'red pomelo', 
 'fruta cítrica grande con pulpa roja y sabor intenso', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'citrica'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL),
 
('FRU005', 'pera ya', 'ya pear', 
 'pera asiática dulce y muy jugosa', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'pepita'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL),
 
('FRU006', 'manzana fuji', 'fuji apple', 
 'manzana crujiente, aromática y muy dulce', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'pepita'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL),

('FRU007', 'manzana azucar corazon', 'sugar heart apple', 
 'manzana china dulce y de pulpa firme', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'pepita'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL),
 
('FRU008', 'pera korla', 'fragrant pear', 
 'pera fragante y muy aromática, típica de xinjiang en china', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'pepita'),  
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL),
 
('FRU009', 'longan', 'longan', 
 'fruta asiática con pulpa dulce y suave', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'hueso'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL),
 
('FRU010', 'azufaifa verde', 'fresh jujube', 
 'fruta asiática verde, crujiente y ligeramente dulce', 
 1, (SELECT id_categoria FROM categorias WHERE nombre = 'hueso'), 
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'), NULL);

-- CAMBIO

INSERT INTO productos 
(referencia, nombre, nombre_ingles, descripcion, id_grupo, id_categoria, id_origen, url_imagen) VALUES
('SET008', 'seta seafood', 'shimeji snow mushroom',
 'seta asiática de tallo largo y sabor suave', 3,
 (SELECT id_categoria FROM categorias WHERE nombre = 'blanco'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_corporativas'),
 NULL
);

UPDATE productos
SET nombre_ingles = 'candy apple fuji'
WHERE referencia = 'FRU007';

INSERT INTO envases (descripcion) VALUES ('caja 500g*8 / 4kg');



-- productos_envases

-- SETA ENOKI
INSERT INTO productos_envases (id_producto, id_envase)
SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 100g*50 / 5kg'
WHERE p.referencia = 'SET005';

INSERT INTO productos_envases (id_producto, id_envase)
SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 200g*25 / 5kg'
WHERE p.referencia = 'SET005';

-- SETA ERYNGII
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 2kg*2 / 4kg'
WHERE p.referencia = 'SET007';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'al vacío 250g*20 / 5kg'
WHERE p.referencia = 'SET007';

-- SETA SHIMEJI BLANCO
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 150g*40 / 6kg'
WHERE p.referencia = 'SET002';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 150g*20 / 3kg'
WHERE p.referencia = 'SET002';

-- SETA SHIMEJI MARRON
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 150g*40 / 6kg'
WHERE p.referencia = 'SET003';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 150g*20 / 3kg'
WHERE p.referencia = 'SET003';

-- SETA SHIITAKE
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 2,5kg*2 / 5kg'
WHERE p.referencia = 'SET004';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'al vacío 250g*20 / 5kg'
WHERE p.referencia = 'SET004';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'granel 2,5kg'
WHERE p.referencia = 'SET004';

-- SETA SEAFOOD
INSERT INTO productos_envases (id_producto, id_envase) 
SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 150g*40 / 6kg'
WHERE p.referencia = 'SET008';

INSERT INTO productos_envases (id_producto, id_envase)
SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bolsas 150g*20 / 3kg'
WHERE p.referencia = 'SET008';

-- SETAS MIXTAS
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '400g*20p-8kg'
WHERE p.referencia = 'SET006';

-- FRUTA

-- PERA MARRON
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '8/9/10/12/14 piezas / 5kg'
WHERE p.referencia = 'FRU003';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bandejas 3 piezas*8 / 11kg'
WHERE p.referencia = 'FRU003';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'granel 18-26 piezas / 4,5kg'
WHERE p.referencia = 'FRU003';

-- POMELO BLANCO
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '8/9/10/11/12 piezas / 11kg'
WHERE p.referencia = 'FRU001';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '8/9/10/11/12 piezas / 12kg'
WHERE p.referencia = 'FRU001';

-- POMELO ROJO
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '8/9/10/11/12 piezas / 11kg'
WHERE p.referencia = 'FRU004';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '8/9/10/11/12 piezas / 12kg'
WHERE p.referencia = 'FRU004';

-- PERA NASHI
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '16/18/20/22 piezas / 4,5kg'
WHERE p.referencia = 'FRU002';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '32/36/40/44 piezas / 9kg'
WHERE p.referencia = 'FRU002';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bandejas 4 piezas*12'
WHERE p.referencia = 'FRU002';

-- PERA YA
INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '16/18/20/22 piezas / 4kg'
WHERE p.referencia = 'FRU005';

INSERT INTO productos_envases SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'bandejas 4 piezas*12 / 12kg'
WHERE p.referencia = 'FRU005';

-- MANZANA FUJI
INSERT INTO productos_envases
SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '18-20 piezas / 4,5kg'
WHERE p.referencia = 'FRU006';

-- MANZANA AZUCAR CORAZON
INSERT INTO productos_envases
SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = '16-22 piezas / 5kg'
WHERE p.referencia = 'FRU007';

-- PERA KORLA
INSERT INTO productos_envases
SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'granel 18-26 piezas / 7/9kg'
WHERE p.referencia = 'FRU008';

-- LONGAN
INSERT INTO productos_envases
SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'cesta 3kg'
WHERE p.referencia = 'FRU009';

-- FRU010 Azufaifa verde
INSERT INTO productos_envases
SELECT p.id_producto, e.id_envase FROM productos p
JOIN envases e ON e.descripcion = 'caja 500g*8 / 4kg'
WHERE p.referencia = 'FRU010';

SELECT * FROM productos_envases;
 
-- productos destacados para homepage
UPDATE productos
SET destacado = 1
WHERE referencia IN ('FRU001', 'FRU002', 'FRU003', 'FRU004');


SELECT * FROM productos WHERE destacado = 1;

-- insertar imagenes de producto

SET SQL_SAFE_UPDATES = 0;

UPDATE productos
SET url_imagen = 'seta_enoki.webp'
WHERE nombre = 'seta enoki';

UPDATE productos
SET url_imagen = 'seta_eryngii.webp'
WHERE nombre = 'seta eryngii';

UPDATE productos
SET url_imagen = 'seta_seafood.webp'
WHERE nombre = 'seta seafood';

UPDATE productos
SET url_imagen = 'seta_shimeji_blanco.webp'
WHERE nombre = 'seta shimeji blanco';

UPDATE productos
SET url_imagen = 'seta_shimeji_marron.webp'
WHERE nombre = 'seta shimeji marron';

UPDATE productos
SET url_imagen = 'seta_shiitake.webp'
WHERE nombre = 'seta shiitake';

UPDATE productos
SET url_imagen = 'setas_mixtas.webp'
WHERE nombre = 'setas mixtas';

UPDATE productos
SET url_imagen = 'pomelo_blanco.webp'
WHERE nombre = 'pomelo blanco';

UPDATE productos
SET url_imagen = 'pomelo_rojo.webp'
WHERE nombre = 'pomelo rojo';

UPDATE productos
SET url_imagen = 'pera_nachi.webp'
WHERE nombre = 'pera nachi';

UPDATE productos
SET url_imagen = 'pera_marron.webp'
WHERE nombre = 'pera marron';

UPDATE productos
SET url_imagen = 'pera_korla.webp'
WHERE nombre = 'pera korla';

UPDATE productos
SET url_imagen = 'pera_ya.webp'
WHERE nombre = 'pera ya';

UPDATE productos
SET url_imagen = 'manzana_fuji.webp'
WHERE nombre = 'manzana fuji';

UPDATE productos
SET url_imagen = 'manzana_azucar_corazon.webp'
WHERE nombre = 'manzana azucar corazon';

UPDATE productos
SET url_imagen = 'longan.webp'
WHERE nombre = 'longan';

UPDATE productos
SET url_imagen = 'azufaifa_verde.webp'
WHERE nombre = 'azufaifa verde';
-- modificado.

-- SUPERADMIN para pruebas 
-- SOLO PARA ENTORNOS DE DESARROLLO / TESTING

INSERT INTO admin_users (email, password_hash, role, is_active)
VALUES (
  'superadmin@euroasia.com',
  '$2b$10$AUMEGQk.WD523pn0tbbAnuznazEVRkwd2ObBUyoJByMISzKX399Nu',
  1,
  1
)
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  role = VALUES(role),
  is_active = VALUES(is_active);






-- A PARTIR DE AQUÍ LO NUEVO
-- NO HACE FALTA AÑADIR LO ANTERIOR SI TU BBDD YA TIENE LOS DATOS ORIGINALES DE LA SEGUNDA ENTREGA

-- nuevos productos
-- nuevas descripciones
-- nuevos envases
-- imágenes renombradas con el comando para hacer un insert super eficiente



USE EUROASIA;

INSERT INTO productos 
(referencia, nombre, nombre_ingles, descripcion, id_grupo, id_categoria, id_origen, url_imagen)
VALUES
('VER009', 'baby corn', 'baby corn',
 'mazorcas de maíz tiernas, dulces y crujientes para wok y ensaladas',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER010', 'choi yumai baby', 'choi yumai baby',
 'verdura de hoja verde muy tierna, ideal para salteados rápidos',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER011', 'maíz de colores fresco', 'fresh color corn',
 'mazorcas pequeñas de maíz de varios colores, dulces y decorativas',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER012', 'pak choi baby shanghai', 'shangpai baby pak choi',
 'pak choi baby muy tierno, variedad shangpai, de sabor suave',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER013', 'kale chino baby', 'chinese kale baby',
 'variedad joven de kai lan, tallos crujientes y hojas tiernas',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER014', 'choi inglesa baby', 'choi ingesa baby',
 'verdura de hoja asiática tierna, ideal para saltear o hervir',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER015', 'choi sam baby', 'choi sam baby',
 'verdura de tallo fino y hojas pequeñas, muy apreciada en cocina cantonesa',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER016', 'brotes de puerro baby', 'leek sprout baby',
 'brotes tiernos de puerro, sabor suave y aromático',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER017', 'hoja de boniato baby', 'sweet potato leaf baby',
 'hojas jóvenes de boniato, tiernas y de sabor suave',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER018', 'choi oro baby', 'choi oro baby',
 'verdura de hoja asiática de color verde intenso, muy tierna',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER019', 'cundiamor', 'bitter melon',
 'melón amargo típico de la cocina asiática, carne firme y sabor característico',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'melon'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

('VER020', 'fuzzy melon baby', 'fuzzy melon baby',
 'calabaza tierna de piel ligeramente vellosa, de sabor suave',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'melon'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL);

INSERT INTO productos 
(referencia, nombre, nombre_ingles, descripcion, id_grupo, id_categoria, id_origen, url_imagen)
VALUES
-- DURIAN THAILAND / MALASIA
('FRU021', 'durian monthong', 'monthong durian',
 'fruta tropical de gran tamaño, pulpa cremosa y aroma muy intenso',
 1,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hueso'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

-- MANGO THAI
('FRU022', 'mango thai', 'thai mango',
 'mango dulce de origen tailandés, pulpa muy aromática y jugosa',
 1,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hueso'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

-- ARBUTUS (YANGMEI)
('FRU023', 'arbutus yangmei', 'yangmei arbutus',
 'fruta roja pequeña, muy jugosa y ligeramente ácida, típica de china',
 1,
 (SELECT id_categoria FROM categorias WHERE nombre = 'baya'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

-- MINI MANGO
('FRU024', 'mini mango', 'mini mango',
 'mango de pequeño tamaño, muy dulce y cómodo para consumo individual',
 1,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hueso'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

-- PITAHAYA BLANCA
('FRU025', 'pitaya blanca', 'white dragon fruit',
 'fruta tropical de piel roja y pulpa blanca con pequeñas semillas negras',
 1,
 (SELECT id_categoria FROM categorias WHERE nombre = 'baya'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

-- GRANADILLA (SWEET PASSION FRUIT)
('FRU026', 'granadilla', 'sweet passion fruit',
 'fruta tropical de pulpa anaranjada, dulce y aromática',
 1,
 (SELECT id_categoria FROM categorias WHERE nombre = 'baya'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

-- JACK FRUIT (JACA)
('FRU027', 'jackfruit', 'jackfruit',
 'fruta tropical muy grande, pulpa fibrosa y dulce de color amarillo',
 1,
 (SELECT id_categoria FROM categorias WHERE nombre = 'baya'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL),

-- FRUTA DE LA PASIÓN
('FRU028', 'fruta de la pasión', 'passion fruit',
 'fruta de piel morada o amarilla, pulpa ácida muy aromática',
 1,
 (SELECT id_categoria FROM categorias WHERE nombre = 'baya'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_aereo'),
 NULL);

INSERT INTO productos 
(referencia, nombre, nombre_ingles, descripcion, id_grupo, id_categoria, id_origen, url_imagen)
VALUES
-- TALLO DE AJO
('VER021', 'tallo de ajo', 'garlic sprout',
 'tallo tierno de ajo, muy aromático, ideal para salteados y wok',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- NABO BLANCO
('VER022', 'nabo', 'radish',
 'raíz blanca crujiente de sabor ligeramente picante',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'raiz'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- NABO VERDE
('VER023', 'nabo verde', 'green radish',
 'variedad de nabo de piel verde, carne crujiente y jugosa',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'raiz'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- PUERARIA (ARROWROOT)
('VER024', 'pueraria', 'arrowroot',
 'raíz almidonosa muy utilizada en cocina asiática',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- TIRABEQUE (SNOW PEAS)
('VER025', 'tirabeque', 'snow peas',
 'vaina plana y dulce que se consume entera, muy crujiente',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- BAMBÚ DE AGUA
('VER026', 'bambú de agua', 'water bamboo',
 'tallo tierno de bambú cultivado en agua, textura crujiente',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- TIRABEQUE DULCE (SWEET PEAS)
('VER027', 'tirabeque dulce', 'sweet peas',
 'vaina dulce de guisante, muy tierna para consumo entero',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- BAMBÚ FRESCO
('VER028', 'bambú fresco', 'fresh bamboo',
 'brotes de bambú frescos para salteados y sopas',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- JENGIBRE (MÁS MADURO)
('VER029', 'jengibre', 'ginger',
 'raíz de jengibre de sabor intenso y picante, muy aromática',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'raiz'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- BAMBÚ COCIDO
('VER030', 'bambú cocido', 'boiled bamboo',
 'brotes de bambú ya cocidos, listos para consumir o cocinar',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- MALANGA
('VER031', 'malanga', 'malanga',
 'tubérculo rico en almidón, muy usado en guisos y frituras',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- JÍCAMA
('VER032', 'jícama', 'yam bean',
 'raíz jugosa y crujiente, de sabor dulce y refrescante',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'raiz'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- EDDOE
('VER033', 'eddoe', 'eddoe',
 'pequeño tubérculo similar al taro, textura cremosa',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- YAME JAPONÉS
('VER034', 'yame japonés', 'japanese yam',
 'variedad japonesa de ñame, carne blanca y textura firme',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- BARDANA
('VER035', 'bardana', 'burdock',
 'raíz alargada de sabor terroso, típica en cocina japonesa',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'raiz'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- CASTAÑA DE AGUA
('VER036', 'castaña de agua', 'water chestnut',
 'bulbo crujiente y dulce, muy usado en platos salteados',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- EDDOE BROTE ROJO
('VER037', 'eddoe brote rojo', 'red sprout eddoe',
 'tubérculo similar al eddoe con brotes rojizos, textura cremosa',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- YAME
('VER038', 'yame', 'yam',
 'tubérculo alargado rico en almidón, muy versátil en cocina',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- CASTAÑA BICORNICA
('VER039', 'castaña bicornica', 'water chestnut bicorn',
 'variedad de castaña de agua con forma peculiar de cuerno',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- YAME FINO (TIEGUN YAM)
('VER040', 'yame fino', 'tiegun yam',
 'variedad fina de ñame, textura muy suave tras la cocción',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- NABO REDONDA
('VER041', 'nabo redondo', 'round radish',
 'nabo de forma redonda, carne firme y sabor suave',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'raiz'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL),

-- BONIATO (SWEET POTATO)
('VER042', 'boniato', 'sweet potato',
 'tubérculo dulce de carne anaranjada, muy usado al horno o frito',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tuberculo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'importado_maritimo'),
 NULL);

INSERT INTO productos 
(referencia, nombre, nombre_ingles, descripcion, id_grupo, id_categoria, id_origen, url_imagen)
VALUES
('VER043', 'cilantro', 'coriander',
 'hierba aromática de hoja fina, muy utilizada como condimento fresco',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'aromatico'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER044', 'espinacas', 'spinach',
 'hojas verdes tiernas, ideales para saltear o consumir crudas',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER045', 'cebollino chino', 'chives',
 'hojas largas y finas de sabor suave a cebolla',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'aromatico'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER046', 'tong ho', 'tong ho',
 'verdura de hoja aromática típica de la cocina asiática',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER047', 'amaranto rojo', 'red amaranthus',
 'hojas de color rojizo, sabor suave y textura tierna',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER048', 'kai choi', 'kai choi',
 'variedad de mostaza china de hoja verde',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER049', 'tong ho vietnamita', 'vietnam tong ho',
 'variedad vietnamita de tong ho, hojas aromáticas y tiernas',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER050', 'amaranto verde', 'green amaranthus',
 'hojas verdes tiernas, habituales en salteados asiáticos',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER051', 'pak choi', 'shanghai choi',
 'pak choi de tamaño estándar, tallo blanco y hoja verde',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER052', 'pak choi inglesa', 'english pak choi',
 'variedad de pak choi adaptada a cultivo europeo, hoja tierna',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'hoja_verde'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER053', 'tong kwa larga', 'long tong kwa',
 'calabaza de piel verde alargada, carne firme y suave',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'melon'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER054', 'melón blanco', 'white melon',
 'melón de piel clara, utilizado como verdura en sopas y guisos',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'melon'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER055', 'tong kwa', 'tong kwa',
 'calabaza verde de forma oblonga, muy usada en cocina china',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'melon'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER056', 'luffa', 'luffa',
 'calabaza alargada, carne tierna para sopas y salteados',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'melon'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER057', 'cebolleta china', 'spring onion',
 'tallo tierno de cebolla, ideal para uso fresco o salteado',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'aromatico'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER058', 'bangaña', 'poo kwa',
 'calabaza asiática de piel verde, carne firme',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'melon'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER059', 'luffa estrella', 'star luffa',
 'variedad de luffa con sección en forma de estrella',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'melon'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER060', 'bangaña larga', 'long poo kwa',
 'variedad alargada de poo kwa, textura firme',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'melon'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER061', 'apio chino', 'chinese celery',
 'tallos finos y aromáticos, sabor más intenso que el apio común',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'tallo'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER062', 'berenjena asiática', 'eggplant',
 'berenjena alargada de piel fina y carne tierna',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'otros'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER063', 'pepino chino', 'chinese cucumber',
 'pepino alargado y crujiente, piel fina y pocas semillas',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'otros'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL),

('VER064', 'coliflor china', 'chinese cauliflower',
 'coliflor de floretes más pequeños, adecuada para salteados',
 2,
 (SELECT id_categoria FROM categorias WHERE nombre = 'otros'),
 (SELECT id_origen FROM origenes WHERE nombre = 'nacional_proveedores'),
 NULL);


UPDATE productos
SET id_origen = (
    SELECT id_origen 
    FROM origenes 
    WHERE nombre = 'nacional_corporativas'
)
WHERE id_origen = (
    SELECT id_origen 
    FROM origenes 
    WHERE nombre = 'nacional_proveedores'
);

-- este creo que no hace nada
UPDATE productos 
SET nombre = 'bangana'
WHERE nombre = 'banganaa';

-- actualizar url_imagen para que coincida con el nuevo formato de nombre: 
SET SQL_SAFE_UPDATES = 0;

UPDATE productos
SET url_imagen = CONCAT(REPLACE(nombre, ' ', '_'), '.webp');

SET SQL_SAFE_UPDATES = 1;

-- inserts de etiquetas

INSERT INTO etiquetas(nombre) VALUES ('aromatico');

INSERT INTO etiquetas(nombre) VALUES ('cremoso');
INSERT INTO etiquetas(nombre) VALUES ('harinoso');
select * from etiquetas;

select * from productos_etiquetas;
select * from productos_envases;

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('suave','carnoso')
WHERE p.referencia = 'SET007';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('suave','carnoso')
WHERE p.referencia = 'SET002';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico','aromatico')
WHERE p.referencia = 'SET003';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico','aromatico')
WHERE p.referencia = 'SET004';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico','suave')
WHERE p.referencia = 'SET005';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico')
WHERE p.referencia = 'SET006';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico','suave')
WHERE p.referencia = 'SET008';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico','jugoso')
WHERE p.referencia = 'FRU001';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','jugoso','asiatico')
WHERE p.referencia = 'FRU002';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','asiatico')
WHERE p.referencia = 'FRU003';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('intenso')
WHERE p.referencia = 'FRU004';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','jugoso','asiatico')
WHERE p.referencia = 'FRU005';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','aromatico','crujiente')
WHERE p.referencia = 'FRU006';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','asiatico')
WHERE p.referencia = 'FRU007';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('aromatico','asiatico','exotico')
WHERE p.referencia = 'FRU008';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','suave','asiatico','exotico')
WHERE p.referencia = 'FRU009';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','asiatico','crujiente', 'exotico')
WHERE p.referencia = 'FRU010';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','dulce')
WHERE p.referencia = 'VER009';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','asiatico')
WHERE p.referencia = 'VER010';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce')
WHERE p.referencia = 'VER011';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','suave','asiatico')
WHERE p.referencia = 'VER012';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','crujiente','asiatico')
WHERE p.referencia = 'VER013';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','asiatico')
WHERE p.referencia = 'VER014';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','asiatico')
WHERE p.referencia = 'VER015';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','aromatico','asiatico')
WHERE p.referencia = 'VER016';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','suave')
WHERE p.referencia = 'VER017';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','asiatico')
WHERE p.referencia = 'VER018';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('intenso','asiatico')
WHERE p.referencia = 'VER019';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('suave','asiatico')
WHERE p.referencia = 'VER020';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('intenso','cremoso','asiatico','exotico','tropical')
WHERE p.referencia = 'FRU021';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','cremoso','asiatico','jugoso','tropical')
WHERE p.referencia = 'FRU022';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('exotico','aromatico','asiatico','jugoso')
WHERE p.referencia = 'FRU023';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','jugoso','tropical')
WHERE p.referencia = 'FRU024';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('suave','tropical')
WHERE p.referencia = 'FRU025';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','tropical','aromatico','exotico')
WHERE p.referencia = 'FRU026';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','tropical','fibroso','exotico')
WHERE p.referencia = 'FRU027';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('aromatico','tropical','exotico')
WHERE p.referencia = 'FRU028';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('aromatico','tierno','asiatico')
WHERE p.referencia = 'VER021';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('crujiente','asiatico')
WHERE p.referencia = 'VER022';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('crujiente','asiatico','jugoso')
WHERE p.referencia = 'VER023';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('exotico','asiatico','harinoso')
WHERE p.referencia = 'VER024';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce','crujiente','suave')
WHERE p.referencia = 'VER025';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','suave','asiatico')
WHERE p.referencia = 'VER026';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','dulce')
WHERE p.referencia = 'VER027';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('crujiente','asiatico')
WHERE p.referencia = 'VER028';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('intenso','aromatico','fibroso')
WHERE p.referencia = 'VER029';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','suave','asiatico')
WHERE p.referencia = 'VER030';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('harinoso')
WHERE p.referencia = 'VER031';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('jugoso','dulce','crujiente')
WHERE p.referencia = 'VER030';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('jugoso','dulce','crujiente')
WHERE p.referencia = 'VER032';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('cremoso','harinoso','asiatico','suave')
WHERE p.referencia = 'VER033';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('harinoso','asiatico','suave')
WHERE p.referencia = 'VER034';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('exotico','asiatico')
WHERE p.referencia = 'VER035';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('exotico','asiatico','crujiente','dulce')
WHERE p.referencia = 'VER036';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('cremoso','harinoso','asiatico','suave')
WHERE p.referencia = 'VER037';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('harinoso','asiatico','suave')
WHERE p.referencia = 'VER038';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('harinoso','asiatico','suave')
WHERE p.referencia = 'VER039';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('harinoso','asiatico','suave')
WHERE p.referencia = 'VER040';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico','suave')
WHERE p.referencia = 'VER041';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('dulce')
WHERE p.referencia = 'VER042';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('aromatico')
WHERE p.referencia = 'VER043';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','suave')
WHERE p.referencia = 'VER044';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','suave', 'aromatico')
WHERE p.referencia = 'VER045';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','aisatico', 'aromatico')
WHERE p.referencia = 'VER046';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('tierno','suave')
WHERE p.referencia = 'VER047';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico','intenso')
WHERE p.referencia = 'VER048';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico','tierno','aromatico')
WHERE p.referencia = 'VER049';

INSERT INTO productos_etiquetas (id_producto, id_etiqueta)
SELECT p.id_producto, e.id_etiqueta
FROM productos p
JOIN etiquetas e ON e.nombre IN ('asiatico','tierno')
WHERE p.referencia = 'VER050';






-- inserts nuevos en envases

INSERT INTO productos_envases (id_producto, id_envase)
SELECT p.id_producto, e.id_envase
FROM (
  SELECT 'VER009' AS referencia, 'granel 8kg aprox.'        AS descripcion UNION ALL
  SELECT 'VER010' AS referencia, 'granel 250g*20 piezas'           AS descripcion UNION ALL
  SELECT 'VER011' AS referencia, '2 piezas*10 pack'          AS descripcion UNION ALL
  SELECT 'VER012' AS referencia, 'granel 300g*20'            AS descripcion UNION ALL
  SELECT 'VER013' AS referencia, 'granel 300g*20'            AS descripcion
) m
JOIN productos p ON p.referencia = m.referencia
JOIN envases   e ON e.descripcion = m.descripcion
LEFT JOIN productos_envases pe
  ON pe.id_producto = p.id_producto AND pe.id_envase = e.id_envase
WHERE pe.id_producto IS NULL;

-- segunda tanda manual
ALTER TABLE productos_envases
ADD UNIQUE KEY uq_producto_envase (id_producto, id_envase);

INSERT IGNORE INTO productos_envases (id_producto, id_envase)
SELECT p.id_producto, e.id_envase
FROM (
  -- VERDURAS
  SELECT 'VER014' AS referencia, 'granel 300g*20'                 AS descripcion UNION ALL
  SELECT 'VER015' AS referencia, 'granel 5kg'                     AS descripcion UNION ALL
  SELECT 'VER016' AS referencia, 'granel 200g*30p'                AS descripcion UNION ALL
  SELECT 'VER017' AS referencia, 'granel 300h*20p'                AS descripcion UNION ALL
  SELECT 'VER018' AS referencia, 'granel 250g*20 piezas'          AS descripcion UNION ALL
  SELECT 'VER019' AS referencia, 'granel 8kg aprox.'              AS descripcion UNION ALL
  SELECT 'VER020' AS referencia, 'granel 1kg*10 aprox.'           AS descripcion UNION ALL

  -- FRUTAS
  SELECT 'FRU021' AS referencia, 'granel 2,5-3,5kg aprox.'        AS descripcion UNION ALL

  -- Mango thai (dos envases)
  SELECT 'FRU022' AS referencia, '10 piezas / 3,8kg'              AS descripcion UNION ALL
  SELECT 'FRU022' AS referencia, 'granel 5kg'                     AS descripcion UNION ALL

  -- Arbutus yangmei (dos envases)
  SELECT 'FRU023' AS referencia, 'bandejas 800g*12'               AS descripcion UNION ALL
  SELECT 'FRU023' AS referencia, 'bandejas 500g*16'               AS descripcion UNION ALL

  -- Mini mango
  SELECT 'FRU024' AS referencia, 'granel 2kg'                     AS descripcion UNION ALL

  -- Pitaya blanca (tres envases)
  SELECT 'FRU025' AS referencia, 'bandejas 500g aprox. / 10kg'    AS descripcion UNION ALL
  SELECT 'FRU025' AS referencia, 'bandejas 500g aprox. / 3kg'     AS descripcion UNION ALL
  SELECT 'FRU025' AS referencia, 'granel 3kg'                     AS descripcion
) m
JOIN productos p ON p.referencia = m.referencia
JOIN envases   e ON e.descripcion = m.descripcion;

INSERT IGNORE INTO productos_envases (id_producto, id_envase)
SELECT p.id_producto, e.id_envase
FROM (
  -- FRUTAS
  SELECT 'FRU026' AS referencia, 'granel 2kg'                      AS descripcion UNION ALL
  SELECT 'FRU027' AS referencia, 'bandejas 220g*20 / 4,4kg'         AS descripcion UNION ALL
  SELECT 'FRU028' AS referencia, 'bandejas 220g*40 / 8,8kg'         AS descripcion UNION ALL

  -- VERDURAS / RAÍCES / TALLOS
  SELECT 'VER021' AS referencia, 'bolsas 200g*20 / 4kg'             AS descripcion UNION ALL
  SELECT 'VER022' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER023' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER024' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER025' AS referencia, 'bolsas 200g*20 / 4kg'             AS descripcion UNION ALL
  SELECT 'VER026' AS referencia, 'bolsas 400g*25 / 10kg'            AS descripcion UNION ALL
  SELECT 'VER027' AS referencia, 'bolsas 200g*20 / 4kg'             AS descripcion UNION ALL
  SELECT 'VER028' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER029' AS referencia, 'granel 5kg'                       AS descripcion UNION ALL
  SELECT 'VER030' AS referencia, 'bolsas 500g*20 / 10kg'            AS descripcion UNION ALL
  SELECT 'VER031' AS referencia, 'granel 12kg aprox.'               AS descripcion UNION ALL
  SELECT 'VER032' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER033' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER034' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER035' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER036' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL

  -- EDDOE BROTE ROJO (dos envases)
  SELECT 'VER037' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER037' AS referencia, 'granel 16kg'                      AS descripcion UNION ALL

  -- YAME (dos envases)
  SELECT 'VER038' AS referencia, 'granel 10kg'                      AS descripcion UNION ALL
  SELECT 'VER038' AS referencia, 'al vacío 10kg'                    AS descripcion
) m
JOIN productos p ON p.referencia = m.referencia
JOIN envases   e ON e.descripcion = m.descripcion;

INSERT INTO envases (descripcion)
VALUES ('14 manojos');

INSERT IGNORE INTO productos_envases (id_producto, id_envase)
SELECT p.id_producto, e.id_envase
FROM (
  -- RAÍCES / TUBÉRCULOS
  SELECT 'VER039' AS referencia, 'granel 10kg'                 AS descripcion UNION ALL
  SELECT 'VER040' AS referencia, 'granel 10kg'                 AS descripcion UNION ALL
  SELECT 'VER041' AS referencia, 'granel 10kg/15kg'            AS descripcion UNION ALL
  SELECT 'VER042' AS referencia, 'granel 10kg'                 AS descripcion UNION ALL
  SELECT 'VER042' AS referencia, 'granel 6kg'                  AS descripcion UNION ALL

  -- MANOJOS
  SELECT 'VER043' AS referencia, '20 manojos'                  AS descripcion UNION ALL
  SELECT 'VER044' AS referencia, '12 manojos'                  AS descripcion UNION ALL

  -- HOJA / TALLO
  SELECT 'VER045' AS referencia, 'granel 6kg'                  AS descripcion UNION ALL
  SELECT 'VER046' AS referencia, 'granel 4kg'                  AS descripcion UNION ALL
  SELECT 'VER047' AS referencia, 'granel 5kg aprox.'           AS descripcion UNION ALL
  SELECT 'VER048' AS referencia, 'granel 8kg aprox.'           AS descripcion UNION ALL
  SELECT 'VER049' AS referencia, 'granel 5kg'                  AS descripcion UNION ALL
  SELECT 'VER050' AS referencia, 'granel 5kg aprox.'           AS descripcion UNION ALL

  -- PAK CHOI
  SELECT 'VER051' AS referencia, 'granel 8kg aprox.'           AS descripcion UNION ALL
  SELECT 'VER052' AS referencia, 'granel 8kg aprox.'           AS descripcion UNION ALL
  SELECT 'VER052' AS referencia, 'granel 6kg'                  AS descripcion UNION ALL

  -- MELONES / CALABAZAS
  SELECT 'VER053' AS referencia, 'granel 18kg aprox.'          AS descripcion UNION ALL
  SELECT 'VER054' AS referencia, 'granel 12kg aprox.'          AS descripcion UNION ALL
  SELECT 'VER055' AS referencia, 'granel 16kg'                 AS descripcion UNION ALL
  SELECT 'VER056' AS referencia, 'granel 12kg aprox.'          AS descripcion UNION ALL

  -- CEBOLLETA CHINA 
  SELECT 'VER057' AS referencia, '20 manojos'                  AS descripcion UNION ALL
  SELECT 'VER057' AS referencia, '14 manojos'                  AS descripcion UNION ALL
  -- POO KWA / LUFFA
  SELECT 'VER058' AS referencia, 'granel 12kg aprox.'          AS descripcion UNION ALL
  SELECT 'VER059' AS referencia, 'granel 12kg aprox.'          AS descripcion UNION ALL
  SELECT 'VER060' AS referencia, 'granel 12kg aprox.'          AS descripcion UNION ALL

  -- OTROS
  SELECT 'VER061' AS referencia, 'granel 6kg'                  AS descripcion UNION ALL
  SELECT 'VER062' AS referencia, 'granel 7kg'                  AS descripcion UNION ALL
  SELECT 'VER063' AS referencia, 'granel 12kg aprox.'          AS descripcion UNION ALL
  SELECT 'VER064' AS referencia, 'granel 5kg aprox.'           AS descripcion
) m
JOIN productos p ON p.referencia = m.referencia
JOIN envases   e ON e.descripcion = m.descripcion;

