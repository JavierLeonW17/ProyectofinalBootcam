const express = require('express')
const router = express.Router()

const { registrar, login, perfil } = require('../controllers/auth.controller')
const { registerValidator, loginValidator } = require('../validators/auth.validator')
const validator = require('../middlewares/validate.middleware')
const validarToken = require('../middlewares/auth.middleware')

router.post('/registrar', registerValidator, validator, registrar)
router.post('/login', loginValidator, validator, login)
router.get('/perfil', validarToken, perfil)

module.exports = router
