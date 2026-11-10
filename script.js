// Abre y cierra el menú de navegación en pantallas pequeñas
const boton = document.getElementById('menuToggle');
const menu = document.getElementById('menuPrincipal');

boton.addEventListener('click', () => {
  menu.classList.toggle('abierto');
});

// Cierra el menú al hacer clic en un enlace (útil en celular)
document.querySelectorAll('.menu a').forEach(enlace => {
  enlace.addEventListener('click', () => {
    menu.classList.remove('abierto');
  });
});

// Si ya inicio sesion, cambia "Ingresar" por "Mis pedidos"
if (localStorage.getItem('token')) {
  const enlaceCuenta = document.getElementById('enlaceCuenta');
  enlaceCuenta.textContent = 'MIS PEDIDOS';
  enlaceCuenta.href = 'pedidos.html';
}
