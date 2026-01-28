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
JOIN envases e ON e.descripcion = 'bandejas 3 pieza*8 / 11kg'
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
WHERE nombre = 'seta shitake';

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
--modificado.

-- a futuro: hacer el siguiente comando:

-- UPDATE productos
-- SET url_imagen = CONCAT(REPLACE(nombre, ' ', '_'), '.webp');






