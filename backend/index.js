const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const dbConnection = require('./config/db')
const authRoutes = require('./routes/auth.routes')

dbConnection()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Conectado correctamente al puerto: ${ PORT }`)
})
