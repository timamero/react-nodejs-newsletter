const logger = require('../config/logger')
const nodemailer = require('nodemailer')
const fs = require('fs')

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
  const unsubscribeURL = 'http://localhost:3000/unsubscribe'
  const from = 'welcome@newsletter.com'
  const subject = 'Newsletter Subscription Confirmation'
  const text = `Welcome to the newsletter  
Thank you for subscribing!  
Go to ${unsubscribeURL} to unsubscribe
`
  const htmlStream = fs.createReadStream(`${process.env.FILE_PATH}/communication/welcome.html`)
  htmlStream.on('error', () => {
    logger.error('htmlStream error')
  });

  const welcomeMessage = {
    from: from,
    subject: subject,
    text: text,
    html: htmlStream,
  }
  
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
      htmlStream.destroy()
      logger.error('Error:', error)
    } else {
      logger.info('Ready to send messages...')
    }
  })

  welcomeMessage.to = request.body.email

  transporter.sendMail(welcomeMessage, (err, info) => {
    if (err) {
      logger.error('Error:', err)
    } else {
      logger.info('Message sent')
    }
  })

  htmlStream.on('close', () => {
    logger.info('htmlStream closed')
  })

}

module.exports = {
  unknownEndpoint,
  errorHandler,
  sendWelcomeMessage
}