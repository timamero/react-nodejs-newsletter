require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./config/middleware')
const articlesRouter = require('./controllers/articles')
const emailsRouter = require('./controllers/emails')
const mongoose = require('mongoose')

console.log('connecting to ', process.env.MONGoDB_URI)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/articles', articlesRouter)
app.use('/api/emails', emailsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app