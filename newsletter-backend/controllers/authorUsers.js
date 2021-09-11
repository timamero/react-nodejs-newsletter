const bcrypt = require('bcrypt')
const authorUsersRouter = require('express').Router()
const AuthorUser = require('../models/authorUser')

authorUsersRouter.post('/', (request, response, next) => {
  const body = request.body

  const saltRounds = 10
  bcrypt.hash(body.password, saltRounds)
    .then(passwordHash => {
      const authorUser = new AuthorUser({
        username: body.username,
        name: body.name,
        passwordHash
      })

      authorUser.save()
        .then(savedAuthorUser => response.json(savedAuthorUser))
        .catch(error => next(error))
    })
})

authorUsersRouter.get('/', (request, response) => {
  AuthorUser.find({})
    .populate('articles', { title: 1 , authorUser: 1 })
    .then(authorUsers => response.json(authorUsers))
})

module.exports = authorUsersRouter