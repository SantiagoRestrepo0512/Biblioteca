# Biblioteca 

Aplicacion sencilla de una biblioteca. Permite registrar, consultar, eliminar y actualizar información de personas, materiales y movimientos de la biblioteca.

## Instalación

### Instala las dependencias

En la carpeta raíz del proyecto, ejecuta:

npm install

### Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables con tus datos de configuración de base de datos:

DB_HOST=localhost  
DB_USER=tu_usuario  
DB_PASSWORD=tu_contraseña  
DB_NAME=biblioteca_db  
PORT=3000  

### Inicia el servidor

npm start

El servidor estará corriendo en [http://localhost:3000](http://localhost:3000).

## Base de Datos

### Iniciar el programa

Busca el archivo `app.js` y ejecútalo con Node.js. Si estás utilizando un IDE como Visual Studio Code, abre la terminal y ejecuta:

node app.js

Accede a la consola de MySQL o utiliza una herramienta de administración como MySQL Workbench para conectarte a la base de datos configurada.


### Estructura de la base de datos

La base de datos contiene las siguientes tablas:

- **Persona**: Contiene información de los usuarios (estudiantes, profesores, administrativos).
- **Material**: Registra los materiales disponibles en la biblioteca.
- **Movimiento**: Mantiene un historial de préstamos y devoluciones de materiales.


## Funcionalidades

### Persona

- **GET /persona**: Obtiene todas las personas registradas.
- **POST /persona**: Registra una nueva persona.
- **DELETE /persona/eliminar/:cedula**: Elimina una persona por su cédula.

### Material

- **GET /material**: Obtiene todos los materiales disponibles.
- **POST /material**: Registra un nuevo material.
- **DELETE /material/:id**: Elimina un material por su ID.
- **PUT /material/incrementar/:id**: Incrementa la cantidad de un material específico.

### Movimiento

- **GET /movimiento**: Obtiene todos los movimientos (préstamos y devoluciones).
- **POST /movimiento/prestamo**: Registra un préstamo.
- **POST /movimiento/devolucion**: Registra la devolución de un material.

## Uso

### Iniciar el programa

Asegúrate de haber seguido la instalación y configuración de las variables de entorno. Luego ejecuta el servidor:

npm start

Esto iniciará el servidor en [http://localhost:3000](http://localhost:3000).

### Probar las funcionalidades con Postman

Usa Postman para interactuar con la API.

#### Crear una persona

- **Método**: POST
- **URL**: [http://localhost:3000/persona](http://localhost:3000/persona)
- **Cuerpo (body)**:

```json
{
  "cedula": "1234567890",
  "nombre": "Juan Pérez",
  "rol": "estudiante"
}
```
#### Obtener todas las personas

- **Método**: GET
- **URL**: http://localhost:3000/persona

#### Eliminar una persona

- **Método**: DELETE
- **URL**: http://localhost:3000/persona/eliminar/1234567890

#### Registrar un material

- **Método**: POST
- **URL**: http://localhost:3000/material
- **Cuerpo (body)**:

```json
{
  "titulo": "Introducción a la Programación",
  "tipo": "libro",
  "fecha_registro": "2025-04-14",
  "cantidad_registrada": 10,
  "cantidad_actual": 10
}
```
#### Obtener todos los materiales

- **Método**: GET
- **URL**: http://localhost:3000/material

#### Registrar un prestamo

- **Método**: POST
- **URL**: http://localhost:3000/movimiento/prestamo
- **Cuerpo (body)**:

```json

  {
  "cedula_persona": "1234567890",
  "id_material": 1,
  "fecha": "2025-04-14"
  }

```
#### Registrar una devolución

- **Método**: POST
- **URL**: 
- **Cuerpo (body)**:

```json

  
  {
  "cedula_persona": "1234567890",
  "id_material": 1,
  "fecha": "2025-04-14"
  }

```


