const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authorLoginRouter = require('express').Router()
const AuthorUser = require('../models/authorUser')

authorLoginRouter.post('/', async (request, response) => {
  const body = request.body

  AuthorUser.findOne({ username: body.username })
    .then(returnedUser => {
      bcrypt.compare(body.password, returnedUser.passwordHash)
        .then(result => {
          if (!result) {
            return response.status(401).json({
              error: 'invalid username or password'
            })
          }

          const authorUserForToken = {
            username: returnedUser.username,
            id: returnedUser._id
          }

          const token = jwt.sign(authorUserForToken, process.env.SECRET)

          response
            .status(200)
            .send({ token, username: returnedUser.username, name: returnedUser.name })
        })
    })
})

module.exports = authorLoginRouter