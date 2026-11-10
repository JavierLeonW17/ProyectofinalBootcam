const formLogin = document.getElementById('formLogin');
const mensaje = document.getElementById('mensaje');

// Si ya inicio sesion no tiene que volver a entrar
if (traerToken()) {
  window.location.href = 'pedidos.html';
}

// Viene de crear la cuenta
if (window.location.search.includes('nuevo')) {
  mensaje.textContent = 'Cuenta creada. Ya puedes iniciar sesión.';
  mensaje.classList.add('correcto');
}

formLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  try {
    const datos = await pedirApi('/auth/login', 'POST', {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    });

    guardarToken(datos.token);
    window.location.href = 'pedidos.html';
  } catch (error) {
    mensaje.textContent = error.message;
    mensaje.classList.remove('correcto');
  }
});
