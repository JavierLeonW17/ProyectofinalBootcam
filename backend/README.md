# Lions JLW — Backend

API REST para Lions JLW (estampado y personalización). Permite que un cliente se registre, inicie sesión y gestione sus pedidos de estampado.

**Stack:** Node.js, Express, MongoDB + Mongoose, express-validator, bcrypt, JSON Web Token.

## Cómo correrlo

```bash
cd backend
npm install
cp .env.example .env   # y cambia SECRET_KEY
npm run dev
```

Requiere MongoDB corriendo en `mongodb://127.0.0.1:27017` (base de datos `lions_jlw`).

## Cómo abrir la página

Con el backend corriendo, abre `index.html` con Live Server (o doble clic). Desde ahí se puede crear una cuenta, iniciar sesión y hacer pedidos en `pedidos.html`. La dirección del backend está en `api.js`.

Para ver los datos, abre MongoDB Compass y conéctate a `mongodb://127.0.0.1:27017`. Ahí aparece la base `lions_jlw` con las colecciones `users` y `pedidos`.

## Estructura

```
backend/
├── index.js                 # servidor Express
├── config/db.js             # conexión a MongoDB
├── models/                  # User, Pedido
├── routes/                  # auth.routes, pedido.routes
├── controllers/             # lógica de cada endpoint
├── validators/              # reglas de express-validator
└── middlewares/             # validate (errores de validación), auth (JWT)
```

## Endpoints

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/auth/registrar` | — | Crea un usuario (`nombre`, `email`, `telefono`, `password`) |
| POST | `/api/auth/login` | — | Devuelve un token JWT (1 h) |
| GET | `/api/auth/perfil` | Bearer | Datos del usuario autenticado |
| POST | `/api/pedidos` | Bearer | Crea un pedido (`producto`, `tecnica`, `cantidad`, `descripcion`) |
| GET | `/api/pedidos` | Bearer | Lista los pedidos del usuario |
| GET | `/api/pedidos/:id` | Bearer | Trae un pedido |
| PUT | `/api/pedidos/:id` | Bearer | Actualiza un pedido (incluye `estado`) |
| DELETE | `/api/pedidos/:id` | Bearer | Elimina un pedido |

Valores permitidos:
- `producto`: camiseta, gorra, mug, termo
- `tecnica`: dtf, sublimacion, plancha
- `estado`: pendiente, en_diseno, aprobado, estampando, entregado, cancelado

Cada usuario solo puede ver y modificar sus propios pedidos.

## Postman

Importa `lions_jlw.postman_collection.json`. El request **Iniciar sesion** guarda el token automáticamente, y **Crear pedido** guarda el `pedidoId`, así el resto de requests funcionan sin copiar y pegar.
