// Sin token no puede estar en esta pagina
if (!traerToken()) {
  window.location.href = 'login.html';
}

const formPedido = document.getElementById('formPedido');
const mensaje = document.getElementById('mensaje');
const cardsPedidos = document.getElementById('cardsPedidos');
const sinPedidos = document.getElementById('sinPedidos');
const detallePedido = document.getElementById('detallePedido');
const botonGuardar = document.getElementById('botonGuardar');
const botonCancelarEdicion = document.getElementById('botonCancelarEdicion');

// Guarda el id del pedido que se esta editando (null = pedido nuevo)
let idEditando = null;

const nombresTecnica = {
  dtf: 'DTF',
  sublimacion: 'Sublimación',
  plancha: 'Plancha de calor'
};

const nombresEstado = {
  pendiente: 'Pendiente',
  en_diseno: 'En diseño',
  aprobado: 'Aprobado',
  estampando: 'Estampando',
  entregado: 'Entregado',
  cancelado: 'Cancelado'
};

// Si el token ya vencio toca volver a iniciar sesion
function revisarError(error) {
  if (error.status === 401) {
    cerrarSesion();
    return;
  }

  mensaje.textContent = error.message;
  mensaje.classList.remove('correcto');
}

function crearBoton(texto, accion) {
  const boton = document.createElement('button');
  boton.textContent = texto;
  boton.className = 'boton-simple';
  boton.addEventListener('click', accion);
  return boton;
}

function pintarPedidos(pedidos) {
  cardsPedidos.innerHTML = '';
  sinPedidos.style.display = pedidos.length ? 'none' : 'block';

  pedidos.forEach((pedido) => {
    const card = document.createElement('article');
    card.className = 'card-pedido';

    const titulo = document.createElement('h3');
    titulo.textContent = `${pedido.producto} x${pedido.cantidad}`;

    const estado = document.createElement('span');
    estado.className = `estado estado-${pedido.estado}`;
    estado.textContent = nombresEstado[pedido.estado];

    const fecha = document.createElement('p');
    fecha.textContent = new Date(pedido.createdAt).toLocaleDateString('es-CO');

    const acciones = document.createElement('div');
    acciones.className = 'acciones-card';
    acciones.appendChild(crearBoton('Ver', () => verPedido(pedido._id)));

    // Solo se puede editar si todavia no se ha empezado
    if (pedido.estado === 'pendiente') {
      acciones.appendChild(crearBoton('Editar', () => editarPedido(pedido)));
    }

    acciones.appendChild(crearBoton('Eliminar', () => eliminarPedido(pedido._id)));

    card.append(titulo, estado, fecha, acciones);
    cardsPedidos.appendChild(card);
  });
}

async function cargarPedidos() {
  try {
    const datos = await pedirApi('/pedidos');
    pintarPedidos(datos.pedidos);
  } catch (error) {
    revisarError(error);
  }
}

async function cargarSaludo() {
  try {
    const datos = await pedirApi('/auth/perfil');
    document.getElementById('saludo').textContent = `Hola, ${datos.usuario.nombre}`;
  } catch (error) {
    revisarError(error);
  }
}

// Consulta un pedido por id y muestra su contenido
async function verPedido(id) {
  try {
    const datos = await pedirApi(`/pedidos/${id}`);
    const pedido = datos.pedido;

    document.getElementById('contenidoDetalle').innerHTML = `
      <p><b>Producto:</b> ${pedido.producto}</p>
      <p><b>Técnica:</b> ${nombresTecnica[pedido.tecnica]}</p>
      <p><b>Cantidad:</b> ${pedido.cantidad}</p>
      <p><b>Estado:</b> ${nombresEstado[pedido.estado]}</p>
      <p><b>Fecha:</b> ${new Date(pedido.createdAt).toLocaleString('es-CO')}</p>
      <p><b>Descripción:</b></p>
      <p class="texto-detalle"></p>
    `;
    // La descripcion la escribe el usuario, por eso va con textContent
    document.querySelector('.texto-detalle').textContent = pedido.descripcion;

    detallePedido.showModal();
  } catch (error) {
    revisarError(error);
  }
}

// Pasa los datos del pedido al formulario para cambiarlos
function editarPedido(pedido) {
  idEditando = pedido._id;
  document.getElementById('producto').value = pedido.producto;
  document.getElementById('tecnica').value = pedido.tecnica;
  document.getElementById('cantidad').value = pedido.cantidad;
  document.getElementById('descripcion').value = pedido.descripcion;

  document.getElementById('tituloFormulario').textContent = 'Editar pedido';
  botonGuardar.textContent = 'GUARDAR CAMBIOS';
  botonCancelarEdicion.classList.remove('oculto');
  mensaje.textContent = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function limpiarFormulario() {
  idEditando = null;
  formPedido.reset();
  document.getElementById('tituloFormulario').textContent = 'Nuevo pedido';
  botonGuardar.textContent = 'ENVIAR PEDIDO';
  botonCancelarEdicion.classList.add('oculto');
}

async function eliminarPedido(id) {
  if (!confirm('¿Seguro que quieres eliminar este pedido?')) return;

  try {
    await pedirApi(`/pedidos/${id}`, 'DELETE');
    if (idEditando === id) limpiarFormulario();
    cargarPedidos();
  } catch (error) {
    revisarError(error);
  }
}

formPedido.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const pedido = {
    producto: document.getElementById('producto').value,
    tecnica: document.getElementById('tecnica').value,
    cantidad: document.getElementById('cantidad').value,
    descripcion: document.getElementById('descripcion').value
  };

  try {
    // Si hay un id guardado se actualiza, si no se crea uno nuevo
    if (idEditando) {
      await pedirApi(`/pedidos/${idEditando}`, 'PUT', pedido);
      mensaje.textContent = 'Pedido actualizado.';
    } else {
      await pedirApi('/pedidos', 'POST', pedido);
      mensaje.textContent = 'Pedido enviado. Te contactamos para mostrarte el diseño.';
    }

    limpiarFormulario();
    mensaje.classList.add('correcto');
    cargarPedidos();
  } catch (error) {
    revisarError(error);
  }
});

botonCancelarEdicion.addEventListener('click', limpiarFormulario);
document.getElementById('botonCerrarDetalle').addEventListener('click', () => detallePedido.close());
document.getElementById('botonSalir').addEventListener('click', cerrarSesion);

cargarSaludo();
cargarPedidos();
