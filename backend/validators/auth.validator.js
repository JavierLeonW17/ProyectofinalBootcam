const { body } = require('express-validator')

const registerValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('Nombre requiere minimo 3 caracteres'),
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debes enviar un email valido'),
  body('telefono')
    .trim()
    .notEmpty().withMessage('El telefono es obligatorio')
    .isNumeric().withMessage('El telefono solo debe tener numeros')
    .isLength({ min: 7, max: 10 }).withMessage('El telefono debe tener entre 7 y 10 digitos'),
  body('password')
    .notEmpty().withMessage('El password es obligatorio')
    .isStrongPassword().withMessage('La contraseña debe tener minimo 8 caracteres, mayusculas, minusculas, numeros y caracteres especiales')
]

const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debes enviar un email valido'),
  body('password')
    .notEmpty().withMessage('El password es obligatorio')
]

module.exports = {
  registerValidator,
  loginValidator
}
