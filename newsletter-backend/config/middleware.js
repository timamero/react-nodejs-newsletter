const logger = require('../config/logger')
const nodemailer = require('nodemailer')
const welcomeMessage = require('../communication/welcome')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: `Validation Error: ${error.message}`})
  } else if (error.name === 'MongoError') {
    return response.status(400).send({ error: `Mongo Error: ${error.message}`})
  } 

  next(error)
}

const sendWelcomeMessage = (request, response, next) => {
  console.log('sendWelcomeMessageMiddleware')
  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // verify connection configuration
  transporter.verify((error, success) => {
    if (error) {
      console.log('Error:', error)
    } else {
      console.log('Ready to send messages...')
    }
  })

  welcomeMessage.to = request.body.email

  transporter.sendMail(welcomeMessage, (err, info) => {
    if (err) {
      console.log('Error:', err)
    } else {
      console.log('Message sent')
    }
  })

}

module.exports = {
  unknownEndpoint,
  errorHandler,
  sendWelcomeMessage
}