const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const dbConnection = require('./config/db')

dbConnection()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Conectado correctamente al puerto: ${ PORT }`)
})
