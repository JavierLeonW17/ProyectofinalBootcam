const Pedido = require('../models/Pedido')

const crearPedido = async (peticion, respuesta) => {
  try {
    const { producto, tecnica, cantidad, descripcion } = peticion.body

    const pedido = new Pedido({
      producto,
      tecnica,
      cantidad,
      descripcion,
      usuario: peticion.user.id
    })

    await pedido.save()

    return respuesta.status(201).json({ pedido })
  } catch (error) {
    return respuesta.status(500).json({
      msg: `Error creando pedido: ${ error.message }`
    })
  }
}

const traerPedidos = async (peticion, respuesta) => {
  try {
    const pedidos = await Pedido.find({ usuario: peticion.user.id }).sort({ createdAt: -1 })

    return respuesta.status(200).json({ pedidos })
  } catch (error) {
    return respuesta.status(500).json({
      msg: `Error trayendo pedidos: ${ error.message }`
    })
  }
}

const traerPedidoPorId = async (peticion, respuesta) => {
  try {
    const pedido = await Pedido.findOne({
      _id: peticion.params.id,
      usuario: peticion.user.id
    })

    if (!pedido) return respuesta.status(404).json({
      msg: 'Pedido no encontrado'
    })

    return respuesta.status(200).json({ pedido })
  } catch (error) {
    return respuesta.status(500).json({
      msg: `Error trayendo pedido: ${ error.message }`
    })
  }
}

const actualizarPedido = async (peticion, respuesta) => {
  try {
    const { producto, tecnica, cantidad, descripcion, estado } = peticion.body

    const pedido = await Pedido.findOneAndUpdate(
      { _id: peticion.params.id, usuario: peticion.user.id },
      { producto, tecnica, cantidad, descripcion, estado },
      { returnDocument: 'after', runValidators: true }
    )

    if (!pedido) return respuesta.status(404).json({
      msg: 'Pedido no encontrado'
    })

    return respuesta.status(200).json({
      msg: 'Pedido actualizado correctamente',
      pedido
    })
  } catch (error) {
    return respuesta.status(500).json({
      msg: `Error actualizando pedido: ${ error.message }`
    })
  }
}

const eliminarPedido = async (peticion, respuesta) => {
  try {
    const pedido = await Pedido.findOneAndDelete({
      _id: peticion.params.id,
      usuario: peticion.user.id
    })

    if (!pedido) return respuesta.status(404).json({
      msg: 'Pedido no encontrado'
    })

    return respuesta.status(200).json({
      msg: 'Pedido eliminado'
    })
  } catch (error) {
    return respuesta.status(500).json({
      msg: `Error eliminando pedido: ${ error.message }`
    })
  }
}

module.exports = {
  crearPedido,
  traerPedidos,
  traerPedidoPorId,
  actualizarPedido,
  eliminarPedido
}
