# Lions JLW - Proyecto final Bootcam

Pagina de Lions JLW (estampado y personalizacion) con su backend. El cliente se puede registrar, iniciar sesion y hacer sus pedidos de estampado. Los pedidos se ven en cards y se pueden ver, editar y eliminar.

Frontend: HTML, CSS y JavaScript.
Backend: Node.js, Express, MongoDB con Mongoose, express-validator, bcrypt y JWT.

## Como correrlo

Primero tener MongoDB prendido en `mongodb://127.0.0.1:27017`. La base se llama `lions_jlw`.

```
cd backend
npm install
npm run dev
```

Hay que crear el archivo `.env` copiando `.env.example` y poner una SECRET_KEY.

Despues abrir `index.html` con Live Server. Desde ahi se crea la cuenta, se inicia sesion y se hacen los pedidos en `pedidos.html`.

Para ver los datos se abre MongoDB Compass, se conecta a `mongodb://127.0.0.1:27017` y en `lions_jlw` estan las colecciones `users` y `pedidos`.

## Archivos

- `index.html`, `estilos.css`, `script.js`: pagina de inicio
- `registro.html` y `registro.js`: crear cuenta
- `login.html` y `login.js`: iniciar sesion, guarda el token
- `pedidos.html` y `pedidos.js`: crear, ver, editar y eliminar pedidos
- `api.js`: la funcion `pedirApi` que hace los fetch al backend
- `backend/`: el servidor (config, models, routes, controllers, validators y middlewares)

## Rutas del backend

Autenticacion:
- POST `/api/auth/registrar` - crear usuario (nombre, email, telefono, password)
- POST `/api/auth/login` - devuelve el token (dura 1 hora)
- GET `/api/auth/perfil` - datos del usuario (necesita token)

Pedidos (todas necesitan token):
- POST `/api/pedidos` - crear pedido (producto, tecnica, cantidad, descripcion)
- GET `/api/pedidos` - traer mis pedidos
- GET `/api/pedidos/:id` - traer un pedido
- PUT `/api/pedidos/:id` - editar pedido
- DELETE `/api/pedidos/:id` - eliminar pedido

Productos: camiseta, gorra, mug, termo.
Tecnicas: dtf, sublimacion, plancha.
Estados: pendiente, en_diseno, aprobado, estampando, entregado, cancelado.

Cada usuario solo ve sus propios pedidos.

## Postman

En `backend/lions_jlw.postman_collection.json` esta la coleccion. Al hacer el login el token se guarda solo, y al crear un pedido se guarda el id para usarlo en las otras peticiones.
