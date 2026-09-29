const express = require('express')
const router = express.Router()

const {
  crearPedido,
  traerPedidos,
  traerPedidoPorId,
  actualizarPedido,
  eliminarPedido
} = require('../controllers/pedido.controller')
const {
  idValidator,
  crearPedidoValidator,
  actualizarPedidoValidator
} = require('../validators/pedido.validator')
const validator = require('../middlewares/validate.middleware')
const validarToken = require('../middlewares/auth.middleware')

router.use(validarToken)

router.post('/', crearPedidoValidator, validator, crearPedido)
router.get('/', traerPedidos)
router.get('/:id', idValidator, validator, traerPedidoPorId)
router.put('/:id', actualizarPedidoValidator, validator, actualizarPedido)
router.delete('/:id', idValidator, validator, eliminarPedido)

module.exports = router
