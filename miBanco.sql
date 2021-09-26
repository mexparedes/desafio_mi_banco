CREATE DATABASE banco;

\c banco

CREATE TABLE cuentas (
    id_cuenta INT PRIMARY KEY,
    saldo DECIMAL CHECK (saldo >= 0)
    );   

CREATE TABLE transacciones (
    id_transaccion SERIAL,
    descripcion VARCHAR(50), 
    fecha VARCHAR(10), 
    monto DECIMAL, 
    cuenta INT PRIMARY KEY,
    FOREIGN KEY (cuenta) REFERENCES cuentas (id_cuenta)
    );

INSERT INTO cuentas values (1, 20000);  

