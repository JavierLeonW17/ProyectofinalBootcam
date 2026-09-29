const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conectado a la base de datos')
  } catch (error) {
    console.error(`Error conectandose a MongoDB: ${ error.message }`)
    process.exit(1)
  }
}

module.exports = dbConnection
