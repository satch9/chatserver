import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import initializeSocket from './socket.js'


// setup basic express server
const app = express()
app.use(cors())
const httpServer = createServer(app)
const port = process.env.PORT || 3000

initializeSocket(httpServer)

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
