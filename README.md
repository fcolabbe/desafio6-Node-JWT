# Soft Jobs - Servidor de Autenticación y Autorización

Este proyecto es el backend para la plataforma Soft Jobs, diseñada para ayudar a desarrolladores juniors a encontrar trabajos cortos y acumular experiencia laboral.

## Descripción

Soft Jobs es una API RESTful que maneja la autenticación y autorización de usuarios utilizando JWT (JSON Web Tokens). El servidor permite el registro de nuevos usuarios, el inicio de sesión y la obtención de datos de usuario autenticado.

## Características

- Registro de nuevos usuarios
- Autenticación de usuarios y generación de tokens JWT
- Obtención de datos de usuario autenticado
- Encriptación de contraseñas
- Middleware para verificación de credenciales y tokens

## Requisitos previos

- Node.js
- PostgreSQL
- npm

## Instalación

1. Clona este repositorio:
   ```
   git clone https://github.com/fcolabbe/desafio6-Node-JWT.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd soft-jobs-backend
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Configura la base de datos:
   - Crea una base de datos llamada `softjobs` en PostgreSQL
   - Ejecuta el siguiente script SQL para crear la tabla necesaria:
     ```sql
     CREATE TABLE usuarios (
       id SERIAL,
       email VARCHAR(50) NOT NULL,
       password VARCHAR(60) NOT NULL,
       rol VARCHAR(25),
       lenguage VARCHAR(20)
     );
     ```

5. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Añade las siguientes variables:
     ```
     DB_USER=tu_usuario_de_postgres
     DB_PASSWORD=tu_contraseña_de_postgres
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=softjobs
     JWT_SECRET=tu_clave_secreta_para_jwt
     ```

## Uso

Para iniciar el servidor, ejecuta:

```
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto que hayas configurado).

## Rutas de la API

- `POST /usuarios`: Registra un nuevo usuario
- `POST /login`: Inicia sesión y devuelve un token JWT
- `GET /usuarios`: Obtiene los datos del usuario autenticado (requiere token)

## Tecnologías utilizadas

- Express.js
- JWT (jsonwebtoken)
- bcrypt
- pg (node-postgres)

