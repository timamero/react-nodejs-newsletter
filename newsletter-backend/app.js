require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./util/middleware')
const articlesRouter = require('./controllers/articles')
const previewRouter = require('./controllers/preview')
const emailsRouter = require('./controllers/emails')
const authorUsersRouter = require('./controllers/authorUsers')
const authorLoginRouter = require('./controllers/authorLogin')
const mongoose = require('mongoose')
const logger = require('./util/logger')

logger.info('connecting to ', process.env.MONGoDB_URI)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use('/api/articles', articlesRouter)
app.use('/api/preview', previewRouter)
app.use('/api/emails', emailsRouter)
app.use('/api/authorusers', authorUsersRouter)
app.use('/api/authorlogin', authorLoginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app