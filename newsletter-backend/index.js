require('dotenv').config()
const app = require('./app')
const http = require('http')
const logger = require('./config/logger')

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`)
})