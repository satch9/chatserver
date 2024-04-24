import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import initializeSocket from './socket.js'
import { sequelize } from './src/database/db.js'

// setup basic express server
const app = express()
app.use(cors())
const httpServer = createServer(app)
const port = process.env.PORT || 3000

// Synchronisez mes modèles avec la base de données
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Base de données synchronisée avec succès.')
  })
  .catch((error) => {
    console.error(
      'Erreur lors de la synchronisation de la base de données :',
      error,
    )
  })

// setup socket

initializeSocket(httpServer)

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
