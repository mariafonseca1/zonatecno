-- Tabla CLIENTE
CREATE TABLE CLIENTE (
  id INT IDENTITY(1,1) PRIMARY KEY,
  retira VARCHAR(50),
  direccion VARCHAR(50)
);

-- Tabla FACTURA
CREATE TABLE FACTURA (
  id INT IDENTITY(1,1) PRIMARY KEY,
  id_cliente INT,
  fecha DATE
);

-- Tabla PRODUCTO
CREATE TABLE PRODUCTO (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nombre VARCHAR(50),
  precio INT,
  descripcion VARCHAR(50)
);

-- Tabla FACTURA_PRODUCTO
CREATE TABLE FACTURA_PRODUCTO (
  id INT IDENTITY(1,1) PRIMARY KEY,
  id_factura INT,
  id_producto INT,
  cantidad INT
);

-- Tabla USUARIO
CREATE TABLE USUARIO (
  id INT IDENTITY(1,1) PRIMARY KEY,
  cedula INT,
  nombre VARCHAR(50),
  clave VARCHAR(50)
);


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 


-- Alter-Table FACTURA
ALTER TABLE FACTURA
ADD CONSTRAINT FK_FACTURA_CLIENTE
FOREIGN KEY (id_cliente) REFERENCES CLIENTE (id);

-- Alter-Table FACTURA_PRODUCTO
ALTER TABLE FACTURA_PRODUCTO
ADD CONSTRAINT FK_FACTURA_PRODUCTO_FACTURA
FOREIGN KEY (id_factura) REFERENCES FACTURA (id);

-- Alter-Table FACTURA_PRODUCTO
ALTER TABLE FACTURA_PRODUCTO
ADD CONSTRAINT FK_FACTURA_PRODUCTO_PRODUCTO
FOREIGN KEY (id_producto) REFERENCES PRODUCTO (id);

INSERT INTO CLIENTE (retira, direccion)
VALUES ('Nombre del cliente 1', 'Dirección del cliente 1');

INSERT INTO CLIENTE (retira, direccion)
VALUES ('Nombre del cliente 2', 'Dirección del cliente 2');

INSERT INTO FACTURA (id_cliente, fecha)
VALUES (1, '2023-07-10');

INSERT INTO FACTURA (id_cliente, fecha)
VALUES (2, '2023-07-15');

INSERT INTO PRODUCTO (nombre, precio, descripcion)
VALUES ('Producto 1', 100, 'Descripción del producto 1');

INSERT INTO PRODUCTO (nombre, precio, descripcion)
VALUES ('Producto 2', 50, 'Descripción del producto 2');

INSERT INTO FACTURA_PRODUCTO (id_factura, id_producto, cantidad)
VALUES (1, 1, 3);

INSERT INTO FACTURA_PRODUCTO (id_factura, id_producto, cantidad)
VALUES (1, 2, 2);

INSERT INTO USUARIO (cedula, nombre, clave)
VALUES (12345678, 'Usuario 1', 'clave123');

INSERT INTO USUARIO (cedula, nombre, clave)
VALUES (98765432, 'Usuario 2', 'password456');



