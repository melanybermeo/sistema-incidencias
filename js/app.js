// =============================================
// Registro de Incidencias — lógica principal
// Las incidencias se guardan en el navegador con localStorage.
// =============================================

const CLAVE_STORAGE = 'incidencias';

const formulario = document.getElementById('form-incidencia');
const mensaje = document.getElementById('mensaje');

// ---------- Almacenamiento (localStorage) ----------

function obtenerIncidencias() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    return [];
  }
}

function guardarIncidencias(incidencias) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(incidencias));
}

// ---------- Formulario de registro ----------

function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  clearTimeout(mostrarMensaje.temporizador);
  mostrarMensaje.temporizador = setTimeout(() => {
    mensaje.textContent = '';
  }, 3000);
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const incidencia = {
    id: Date.now(),
    titulo: document.getElementById('titulo').value.trim(),
    descripcion: document.getElementById('descripcion').value.trim(),
    prioridad: document.getElementById('prioridad').value,
    estado: document.getElementById('estado').value,
    fecha: new Date().toISOString()
  };

  const incidencias = obtenerIncidencias();
  incidencias.push(incidencia);
  guardarIncidencias(incidencias);

  formulario.reset();
  mostrarMensaje('Incidencia registrada correctamente.');
});
