const emailsRouter = require('express').Router()
const Email = require('../models/email')

emailsRouter.get('/', (request, response) => {
  Email.find({}).then(emails => response.json(emails))
})

emailsRouter.post('/', (request, response) => {
  const body = request.body

  const email = new Email({
    email: body.email
  })

  email.save().then(savedEmail => response.json(savedEmail))
})

emailsRouter.delete('/', (request, response) => {
  Email.findOneAndRemove({ email: request.body.email})
    .then(result => response.status(204).end())
})

module.exports = emailsRouter