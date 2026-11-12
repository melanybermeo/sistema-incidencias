# Sistema de Registro de Incidencias

Aplicación web sencilla para registrar y consultar las incidencias reportadas por los usuarios de una empresa de desarrollo de software. Proyecto de la asignatura **Gestión de la Configuración del Software** (Unidad 3 – Despliegue continuo), UNEMI.

## Integrantes

| Integrante | Responsabilidad |
|---|---|
| Melanie Bermeo | Repositorio y SCM (Fase 1) |
| José Farias|Versión inicial y releases (Fase 2)|
| Anthony Hernandez| Despliegue automatizado (Fase 3)|
| Jesús Sanchez |Nueva funcionalidad y mejora continua (Fase 4) |

## Funcionalidades

- **v1.0.0** – Registro y listado de incidencias.
- **v1.1.0** – Filtro de incidencias por estado _(pendiente)_.
- **v1.1.1** – Corrección de errores de la versión anterior _(pendiente)_.

## Tecnologías

- HTML5, CSS3 y JavaScript (sin frameworks).
- `localStorage` del navegador para guardar los datos (no requiere base de datos ni servidor).
- Git y GitHub para el control de versiones.
- GitHub Actions y GitHub Pages para la validación y el despliegue automático.

## Estructura del proyecto

```
sistema-incidencias/
├── index.html        # Página principal
├── css/
│   └── styles.css    # Estilos de la aplicación
├── js/
│   └── app.js        # Lógica: registro y listado
└── README.md
```

## Cómo ejecutar la aplicación

### Opción 1: abrir directamente
1. Clona el repositorio:
   ```bash
   git clone https://github.com/<usuario>/sistema-incidencias.git
   cd sistema-incidencias
   ```
2. Abre el archivo `index.html` en cualquier navegador (doble clic).

### Opción 2: servidor local (recomendado)
Con la extensión **Live Server** de Visual Studio Code: clic derecho sobre `index.html` → *Open with Live Server*.

O con Python:
```bash
python -m http.server 8000
```
y abre `http://localhost:8000`.

### Versión publicada
La aplicación está disponible en GitHub Pages: `https://<usuario>.github.io/sistema-incidencias/`

## Flujo de trabajo (ramas)

| Rama | Uso |
|---|---|
| `main` | Código estable y publicado. Protegida: solo recibe cambios por pull request. |
| `develop` | Integración de funcionalidades antes de una release. |
| `feature/*` | Nuevas funcionalidades (ej. `feature/filtro-estado`). |
| `fix/*` | Corrección de errores (ej. `fix/validacion-formulario`). |

Proceso: `feature/*` o `fix/*` → pull request a `develop` → pull request de `develop` a `main` → release.

## Versionamiento

Se usa versionamiento semántico **MAJOR.MINOR.PATCH**:
- **MAJOR**: cambios incompatibles.
- **MINOR**: nuevas funcionalidades compatibles.
- **PATCH**: corrección de errores.
