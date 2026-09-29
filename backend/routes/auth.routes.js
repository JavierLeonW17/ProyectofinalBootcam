const express = require('express')
const router = express.Router()

const { registrar, login, perfil } = require('../controllers/auth.controller')
const validarToken = require('../middlewares/auth.middleware')

router.post('/registrar', registrar)
router.post('/login', login)
router.get('/perfil', validarToken, perfil)

module.exports = router
