const emailsRouter = require('express').Router()
const Email = require('../models/email')
const nodemailer = require('nodemailer')
const welcomeMessage = require('../communication/welcome')

emailsRouter.get('/', (request, response, next) => {
  Email.find({})
    .then(emails => response.json(emails))
    .catch(error => next(error))
})

emailsRouter.post('/', (request, response, next) => {
  const body = request.body

  const email = new Email({
    email: body.email
  })

  email.save()
    .then(savedEmail => {
      response.json(savedEmail)
      next()
    })
    .catch(error => next(error))

}, (request,response) => {
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

})

emailsRouter.delete('/', (request, response) => {
  Email.findOneAndRemove({ email: request.body.email})
    .then(result => { 
      if (!result) {
        return response.status(400).end()
      }
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = emailsRouter