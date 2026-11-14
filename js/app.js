
// Sistema de Registro de Incidencias
// Version 1.1.0
// Funcionalidades: registrar, listar y filtrar incidencias.
// Los datos se almacenan en localStorage.

const CLAVE_STORAGE = "incidencias";

// Elementos del formulario
const form = document.getElementById("form-incidencia");
const tituloInput = document.getElementById("titulo");
const descripcionInput = document.getElementById("descripcion");
const prioridadInput = document.getElementById("prioridad");
const estadoInput = document.getElementById("estado");

// Elementos de la interfaz
const lista = document.getElementById("lista-incidencias");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

// Filtro por estado
const filtroEstado = document.getElementById("filtro-estado");

// Obtener incidencias guardadas

function obtenerIncidencias() {
    try {

        const datos = JSON.parse(
            localStorage.getItem(CLAVE_STORAGE)
        );

        // Comprobar que los datos sean un arreglo
        if (!Array.isArray(datos)) {
            console.warn(
                "Los datos almacenados no tienen un formato válido."
            );

            return [];
        }

        return datos;

    } catch (e) {

        console.error(
            "Error al recuperar las incidencias:",
            e
        );

        return [];
    }
}


// Guardar incidencias
function guardarIncidencias(incidencias) {
    try {
        localStorage.setItem(
            CLAVE_STORAGE,
            JSON.stringify(incidencias)
        );
        return true;
    } catch (error) {
        console.error("Error al guardar incidencias:", error);
        return false;
    }
}

// Evitar que el texto se interprete como HTML
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = String(texto ?? "");
    return div.innerHTML;
}

// Mostrar mensajes
function mostrarMensaje(texto, tipo) {
    if (!mensaje) return;

    mensaje.textContent = texto;
    mensaje.className = "mensaje " + tipo;
}

// Mostrar incidencias y aplicar filtro
function renderizarIncidencias() {

    const incidencias = obtenerIncidencias();

    const estadoSeleccionado = filtroEstado
        ? filtroEstado.value
        : "Todos";

    const incidenciasFiltradas = estadoSeleccionado === "Todos"
        ? incidencias
        : incidencias.filter(
            incidencia => incidencia.estado === estadoSeleccionado
        );

    if (contador) {
        contador.textContent = incidenciasFiltradas.length;
    }

    if (incidenciasFiltradas.length === 0) {
        lista.innerHTML =
            '<p class="vacio">No hay incidencias registradas.</p>';
        return;
    }

    lista.innerHTML = incidenciasFiltradas.map(inc => `
        <article class="incidencia">
            <h3>#${escaparHTML(inc.id)} - ${escaparHTML(inc.titulo)}</h3>

            <p>${escaparHTML(inc.descripcion)}</p>

            <div class="meta">
                <span class="etiqueta prioridad-${escaparHTML(inc.prioridad)}">
                    ${escaparHTML(inc.prioridad)}
                </span>

                <span class="etiqueta estado">
                    ${escaparHTML(inc.estado)}
                </span>

                ${inc.reportadoPor
                    ? "Reportado por " + escaparHTML(inc.reportadoPor)
                    : ""
                }

                · ${escaparHTML(inc.fecha)}
            </div>
        </article>
    `).join("");
}

// Registrar una nueva incidencia
form.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const titulo = tituloInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const prioridad = prioridadInput.value;
    const estado = estadoInput.value;

    // Validar campos obligatorios
    if (!titulo || !descripcion) {
        mostrarMensaje(
            "Completa el título y la descripción.",
            "error"
        );
        return;
    }

    const incidencias = obtenerIncidencias();

    const nuevoId = incidencias.length > 0
        ? Math.max(...incidencias.map(inc => Number(inc.id) || 0)) + 1
        : 1;

    const nuevaIncidencia = {
        id: nuevoId,
        titulo,
        descripcion,
        reportadoPor: "",
        prioridad,
        estado,
        fecha: new Date().toLocaleString("es-EC")
    };

    incidencias.push(nuevaIncidencia);

    if (!guardarIncidencias(incidencias)) {
        mostrarMensaje(
            "No se pudo guardar la incidencia.",
            "error"
        );
        return;
    }

    form.reset();

    if (filtroEstado) {
        filtroEstado.value = "Todos";
    }

    renderizarIncidencias();

    mostrarMensaje(
        "Incidencia registrada correctamente.",
        "exito"
    );
});

// Escuchar cambios en el filtro
if (filtroEstado) {
    filtroEstado.addEventListener("change", renderizarIncidencias);
}

// Cargar incidencias al iniciar
renderizarIncidencias();
