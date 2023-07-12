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
  precio VARCHAR(50),
  descripcion VARCHAR(50)
);

-- Tabla FACTURA_PRODUCTO
CREATE TABLE FACTURA_PRODUCTO (
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


-- Tabla FACTURA
ALTER TABLE FACTURA
ADD CONSTRAINT FK_FACTURA_CLIENTE
FOREIGN KEY (id_cliente) REFERENCES CLIENTE (id);

-- Tabla FACTURA_PRODUCTO
ALTER TABLE FACTURA_PRODUCTO
ADD CONSTRAINT FK_FACTURA_PRODUCTO_FACTURA
FOREIGN KEY (id_factura) REFERENCES FACTURA (id);

ALTER TABLE FACTURA_PRODUCTO
ADD CONSTRAINT FK_FACTURA_PRODUCTO_PRODUCTO
FOREIGN KEY (id_producto) REFERENCES PRODUCTO (id);

insert into USUARIO (cedula,nombre,clave) values (117880052,'Maria','1234'); 
