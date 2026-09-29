const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const registrar = async (peticion, respuesta) => {
  try {
    const { nombre, email, telefono, password } = peticion.body

    const existe = await User.findOne({ email })

    if (existe) return respuesta.status(400).json({
      msg: 'El usuario ya existe en la base de datos'
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      nombre,
      email,
      telefono,
      password: hashedPassword
    })

    await user.save()

    return respuesta.status(201).json({
      msg: 'El usuario fue creado exitosamente',
      usuario: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono
      }
    })
  } catch (error) {
    return respuesta.status(500).json({
      error: `Error al registrar usuario: ${ error.message }`
    })
  }
}

const login = async (peticion, respuesta) => {
  try {
    const { email, password } = peticion.body
    const user = await User.findOne({ email })

    if (!user) return respuesta.status(404).json({
      msg: 'Usuario no existe'
    })

    const passwordsCoinciden = await bcrypt.compare(password, user.password)

    if (!passwordsCoinciden) return respuesta.status(401).json({
      msg: 'Contraseña incorrecta'
    })

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    )

    return respuesta.status(200).json({
      msg: 'Inicio de sesion exitoso',
      token
    })
  } catch (error) {
    return respuesta.status(500).json({
      error: `Error al iniciar sesion: ${ error.message }`
    })
  }
}

const perfil = async (peticion, respuesta) => {
  try {
    const user = await User.findById(peticion.user.id).select('-password')

    if (!user) return respuesta.status(404).json({
      msg: 'Usuario no existe'
    })

    return respuesta.status(200).json({ usuario: user })
  } catch (error) {
    return respuesta.status(500).json({
      error: `Error trayendo el perfil: ${ error.message }`
    })
  }
}

module.exports = {
  registrar,
  login,
  perfil
}
