// Sistema de Registro de Incidencias - v1.0.0
// Funcionalidades: registrar y listar incidencias.
// Los datos se guardan en el navegador (localStorage), sin base de datos ni servidor.

const CLAVE_STORAGE = "incidencias";

const form = document.getElementById("form-incidencia");
const lista = document.getElementById("lista-incidencias");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

// ---------- Datos ----------

function obtenerIncidencias() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];
  } catch (e) {
    return [];
  }
}

function guardarIncidencias(incidencias) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(incidencias));
  } catch (e) {
    console.error("No se pudo guardar en localStorage", e);
  }
}

// ---------- Utilidades ----------

// Evita que el texto ingresado se interprete como HTML
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}

// ---------- Interfaz ----------

function renderizarIncidencias(incidencias) {
  contador.textContent = incidencias.length;

  if (incidencias.length === 0) {
    lista.innerHTML = '<p class="vacio">No hay incidencias registradas.</p>';
    return;
  }

  lista.innerHTML = incidencias
    .map(
      (inc) => `
      <article class="incidencia">
        <h3>#${inc.id} - ${escaparHTML(inc.titulo)}</h3>
        <p>${escaparHTML(inc.descripcion)}</p>
        <div class="meta">
          <span class="etiqueta prioridad-${inc.prioridad}">${inc.prioridad}</span>
          <span class="etiqueta estado">${inc.estado}</span>
          Reportado por ${escaparHTML(inc.reportadoPor)} · ${inc.fecha}
        </div>
      </article>`
    )
    .join("");
}

// ---------- Eventos ----------

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const reportadoPor = document.getElementById("reportado-por").value.trim();
  const prioridad = document.getElementById("prioridad").value;
  const estado = document.getElementById("estado").value;

  if (!titulo || !descripcion || !reportadoPor) {
    mostrarMensaje("Completa todos los campos obligatorios.", "error");
    return;
  }

  const incidencias = obtenerIncidencias();
  const nuevoId = incidencias.length > 0 ? incidencias[incidencias.length - 1].id + 1 : 1;

  incidencias.push({
    id: nuevoId,
    titulo,
    descripcion,
    reportadoPor,
    prioridad,
    estado,
    fecha: new Date().toLocaleString("es-EC"),
  });

  guardarIncidencias(incidencias);
  renderizarIncidencias(incidencias);
  form.reset();
  mostrarMensaje("Incidencia registrada correctamente.", "exito");
});

// Carga inicial
renderizarIncidencias(obtenerIncidencias());
