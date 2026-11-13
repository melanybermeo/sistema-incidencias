# Changelog

Todos los cambios importantes de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y el proyecto sigue el [Versionado Semántico](https://semver.org/lang/es/) (MAJOR.MINOR.PATCH).

## [Sin publicar]

## [1.0.0] - 2026-11-12

### Añadido
- Formulario para registrar incidencias con título, descripción, prioridad (Baja, Media, Alta) y estado (Abierta, En proceso, Resuelta).
- Listado de incidencias registradas, de la más reciente a la más antigua, con su prioridad, estado y fecha de registro.
- Contador con el total de incidencias.
- Botón para eliminar una incidencia del listado.
- Persistencia de las incidencias en el navegador mediante `localStorage`, para que se conserven al recargar la página.
