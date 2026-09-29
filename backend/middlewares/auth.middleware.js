const jwt = require('jsonwebtoken')

module.exports = (peticion, respuesta, next) => {
  const headerAuthorization = peticion.header('Authorization')

  if (!headerAuthorization || !headerAuthorization.startsWith('Bearer ')) {
    return respuesta.status(401).json({
      msg: 'No hay token'
    })
  }

  const token = headerAuthorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    peticion.user = decoded
    next()
  } catch (error) {
    return respuesta.status(401).json({
      msg: `Token invalido: ${ error.message }`
    })
  }
}
