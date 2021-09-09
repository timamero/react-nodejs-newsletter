const bcrypt = require('bcrypt')
const authorUsersRouter = require('express').Router()
const AuthorUser = require('../models/authorUser')

authorUsersRouter.post('/', (request, response, next) => {
  const body = request.body

  const saltRounds = 10
  bcrypt.hash(body.password, saltRounds)
    .then(hash => {
      const authorUser = new AuthorUser({
        username: body.username,
        name: body.name,
        hash
      })

      authorUser.save()
        .then(savedAuthorUser => response.json(savedAuthorUser))
        .catch(error => next(error))
    })
})

authorUsersRouter.get('/', (request, response) => {
  AuthorUser.find({})
    .then(authorUsers => response.json(authorUsers))
})

module.exports = authorUsersRouter