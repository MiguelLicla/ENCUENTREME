# Encuéntrame.pe — Sistema de Objetos Perdidos (Plaza Norte)

Este es el repositorio oficial de **Encuéntrame.pe**, una plataforma para la gestión y reporte de objetos perdidos y hallados en Plaza Norte.

## Estructura del Proyecto

- **/ENCUENTREME_BACKEND**: API REST construida con .NET 8 y PostgreSQL (Neon). Incluye soporte para Docker.
- **/ENCUENTREME_FRONTEND**: Aplicación web SPA construida con Angular 18 y el sistema de diseño estilo Apple.
- **/sql**: Scripts de base de datos para migraciones y correcciones.

## Despliegue

- **Backend**: Desplegado en **Render** usando el `Dockerfile` proporcionado.
- **Frontend**: Desplegado en **Vercel** con soporte para SPA (`vercel.json`).

## Requisitos de Desarrollo

- .NET 8 SDK
- Node.js 20+
- Angular CLI 18
- Base de Datos PostgreSQL

## Cómo Empezar

1. Clona el repositorio.
2. Configura las variables de entorno:
   - **Local**: Puedes crear un archivo `.env` o usar `dotnet user-secrets`.
   - **Producción (Render)**: Configura `ConnectionStrings__DefaultConnection` y `Jwt__Key` en el panel de control.
3. Variables necesarias:
   - `ConnectionStrings__DefaultConnection`: Cadena de conexión a PostgreSQL.
   - `Jwt__Key`: Llave secreta para JWT.
4. Ejecuta `npm install` en la carpeta del frontend.
5. ¡Listo para desarrollar!
