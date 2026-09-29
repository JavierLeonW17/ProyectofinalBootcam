const mongoose = require('mongoose')

const PRODUCTOS = ['camiseta', 'gorra', 'mug', 'termo']
const TECNICAS = ['dtf', 'sublimacion', 'plancha']
const ESTADOS = ['pendiente', 'en_diseno', 'aprobado', 'estampando', 'entregado', 'cancelado']

const pedidoSchema = new mongoose.Schema({
  producto: {
    type: String,
    enum: PRODUCTOS,
    required: true
  },
  tecnica: {
    type: String,
    enum: TECNICAS,
    default: 'dtf'
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: String,
    enum: ESTADOS,
    default: 'pendiente'
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Pedido', pedidoSchema)
module.exports.PRODUCTOS = PRODUCTOS
module.exports.TECNICAS = TECNICAS
module.exports.ESTADOS = ESTADOS
