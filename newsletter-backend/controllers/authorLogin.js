const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authorLoginRouter = require('express').Router()
const AuthorUser = require('../models/authorUser')

authorLoginRouter.post('/', async (request, response, next) => {
  const body = request.body

  AuthorUser.findOne({ username: body.username })
    .then(returnedUser => {
      if (!returnedUser) {
        return response.status(401).json({
          error: 'the user does not exist'
        })
      }

      if (!returnedUser.passwordHash) {
        return response.status(401).json({
          error: 'invalid username or password'
        })
      }

      bcrypt.compare(body.password, returnedUser.passwordHash)
        .then(result => {
          const authorUserForToken = {
            username: returnedUser.username,
            id: returnedUser._id
          }

          const token = jwt.sign(authorUserForToken, process.env.SECRET)

          response
            .status(200)
            .send({ token, username: returnedUser.username, name: returnedUser.name })
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

module.exports = authorLoginRouter