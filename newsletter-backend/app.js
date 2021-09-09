require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./config/middleware')
const articlesRouter = require('./controllers/articles')
const emailsRouter = require('./controllers/emails')
const authorUsersRouter = require('./controllers/authorUsers')
const mongoose = require('mongoose')
const logger = require('./config/logger')

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

app.use('/api/articles', articlesRouter)
app.use('/api/emails', emailsRouter)
app.use('/api/authorusers', authorUsersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app