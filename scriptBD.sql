CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE persona (
    cedula VARCHAR(15) PRIMARY KEY,
    nombre VARCHAR(100),
    rol ENUM('estudiante', 'profesor', 'administrativo') NOT NULL
);

CREATE TABLE material (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tipo ENUM('libro', 'revista', 'audiovisual') NOT NULL,
    fecha_registro DATE NOT NULL,
    cantidad_registrada INT NOT NULL,
    cantidad_actual INT NOT NULL
);

CREATE TABLE movimiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('prestamo', 'devolucion') NOT NULL,
    fecha DATE NOT NULL,
    cedula_persona VARCHAR(15),
    id_material INT,
    FOREIGN KEY (cedula_persona) REFERENCES persona(cedula),
    FOREIGN KEY (id_material) REFERENCES material(id)
);


