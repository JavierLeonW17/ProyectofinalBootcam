const formRegistro = document.getElementById('formRegistro');
const mensaje = document.getElementById('mensaje');

formRegistro.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  try {
    await pedirApi('/auth/registrar', 'POST', {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      password: document.getElementById('password').value
    });

    window.location.href = 'login.html?nuevo=1';
  } catch (error) {
    mensaje.textContent = error.message;
  }
});
