// Direccion del backend
const API_URL = 'http://localhost:3000/api';

function traerToken() {
  return localStorage.getItem('token');
}

function guardarToken(token) {
  localStorage.setItem('token', token);
}

function cerrarSesion() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

// Hace la peticion al backend y devuelve la respuesta en JSON
async function pedirApi(ruta, metodo = 'GET', cuerpo = null) {
  const opciones = {
    method: metodo,
    headers: { 'Content-Type': 'application/json' }
  };

  if (traerToken()) {
    opciones.headers.Authorization = `Bearer ${traerToken()}`;
  }

  if (cuerpo) {
    opciones.body = JSON.stringify(cuerpo);
  }

  let respuesta;

  try {
    respuesta = await fetch(API_URL + ruta, opciones);
  } catch (error) {
    throw new Error('No se pudo conectar con el servidor');
  }

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    const error = new Error(leerError(datos));
    error.status = respuesta.status;
    throw error;
  }

  return datos;
}

// El backend manda los errores en msg, error o en la lista errores
function leerError(datos) {
  if (datos.errores) return datos.errores[0].msg;
  return datos.msg || datos.error || 'Ocurrió un error';
}
