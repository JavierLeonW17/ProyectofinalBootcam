const { body, param } = require('express-validator')
const { PRODUCTOS, TECNICAS, ESTADOS } = require('../models/Pedido')

const idValidator = [
  param('id')
    .isMongoId().withMessage('El id del pedido no es valido')
]

const crearPedidoValidator = [
  body('producto')
    .notEmpty().withMessage('El producto es obligatorio')
    .isIn(PRODUCTOS).withMessage(`El producto debe ser uno de: ${ PRODUCTOS.join(', ') }`),
  body('tecnica')
    .optional()
    .isIn(TECNICAS).withMessage(`La tecnica debe ser una de: ${ TECNICAS.join(', ') }`),
  body('cantidad')
    .notEmpty().withMessage('La cantidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un numero entero mayor a 0'),
  body('descripcion')
    .trim()
    .notEmpty().withMessage('La descripcion del diseño es obligatoria')
    .isLength({ min: 10 }).withMessage('La descripcion requiere minimo 10 caracteres')
]

const actualizarPedidoValidator = [
  ...idValidator,
  body('producto')
    .optional()
    .isIn(PRODUCTOS).withMessage(`El producto debe ser uno de: ${ PRODUCTOS.join(', ') }`),
  body('tecnica')
    .optional()
    .isIn(TECNICAS).withMessage(`La tecnica debe ser una de: ${ TECNICAS.join(', ') }`),
  body('cantidad')
    .optional()
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un numero entero mayor a 0'),
  body('descripcion')
    .optional()
    .trim()
    .isLength({ min: 10 }).withMessage('La descripcion requiere minimo 10 caracteres'),
  body('estado')
    .optional()
    .isIn(ESTADOS).withMessage(`El estado debe ser uno de: ${ ESTADOS.join(', ') }`)
]

module.exports = {
  idValidator,
  crearPedidoValidator,
  actualizarPedidoValidator
}
