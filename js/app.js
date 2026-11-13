// =============================================
// Registro de Incidencias — lógica principal
// Las incidencias se guardan en el navegador con localStorage.
// =============================================

const CLAVE_STORAGE = 'incidencias';

const formulario = document.getElementById('form-incidencia');
const mensaje = document.getElementById('mensaje');
const listaIncidencias = document.getElementById('lista-incidencias');
const listaVacia = document.getElementById('lista-vacia');
const contador = document.getElementById('contador');

// Clases CSS según la prioridad y el estado
const CLASE_PRIORIDAD = { Alta: 'alta', Media: 'media', Baja: 'baja' };
const CLASE_ESTADO = { Abierta: 'abierta', 'En proceso': 'proceso', Resuelta: 'resuelta' };

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
  actualizarListado();
});

// ---------- Listado de incidencias ----------

function formatearFecha(fechaISO) {
  return new Date(fechaISO).toLocaleString('es-EC', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function crearEtiqueta(texto, clase) {
  const etiqueta = document.createElement('span');
  etiqueta.className = `etiqueta etiqueta-${clase}`;
  etiqueta.textContent = texto;
  return etiqueta;
}

function crearElementoIncidencia(incidencia) {
  const clasePrioridad = CLASE_PRIORIDAD[incidencia.prioridad] || 'media';
  const claseEstado = CLASE_ESTADO[incidencia.estado] || 'abierta';

  const item = document.createElement('li');
  item.className = `incidencia prioridad-${clasePrioridad}`;

  // Título y botón para eliminar
  const cabecera = document.createElement('div');
  cabecera.className = 'incidencia-cabecera';

  const titulo = document.createElement('h3');
  titulo.textContent = incidencia.titulo;

  const botonEliminar = document.createElement('button');
  botonEliminar.type = 'button';
  botonEliminar.className = 'boton-eliminar';
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.dataset.id = incidencia.id;

  cabecera.append(titulo, botonEliminar);

  // Descripción
  const descripcion = document.createElement('p');
  descripcion.className = 'incidencia-descripcion';
  descripcion.textContent = incidencia.descripcion;

  // Prioridad, estado y fecha
  const datos = document.createElement('div');
  datos.className = 'incidencia-datos';

  const fecha = document.createElement('time');
  fecha.dateTime = incidencia.fecha;
  fecha.textContent = formatearFecha(incidencia.fecha);

  datos.append(
    crearEtiqueta(incidencia.prioridad, clasePrioridad),
    crearEtiqueta(incidencia.estado, claseEstado),
    fecha
  );

  item.append(cabecera, descripcion, datos);
  return item;
}

// Dibuja en pantalla la lista que recibe (sirve también para listas filtradas)
function renderizarIncidencias(incidencias) {
  listaIncidencias.innerHTML = '';
  incidencias.forEach((incidencia) => {
    listaIncidencias.appendChild(crearElementoIncidencia(incidencia));
  });
  listaVacia.hidden = incidencias.length > 0;
  contador.textContent = incidencias.length;
}

// Lee localStorage y muestra las incidencias, de la más reciente a la más antigua
function actualizarListado() {
  const incidencias = obtenerIncidencias().reverse();
  renderizarIncidencias(incidencias);
}

listaIncidencias.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.boton-eliminar');
  if (!boton) return;

  const id = Number(boton.dataset.id);
  const restantes = obtenerIncidencias().filter((incidencia) => incidencia.id !== id);
  guardarIncidencias(restantes);
  actualizarListado();
});

// Carga inicial
actualizarListado();
