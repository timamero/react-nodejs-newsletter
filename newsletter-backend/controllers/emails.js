const emailsRouter = require('express').Router()
const Email = require('../models/email')

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
    .then(savedEmail => response.json(savedEmail))
    .catch(error => next(error))
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