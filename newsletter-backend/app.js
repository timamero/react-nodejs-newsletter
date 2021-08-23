require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./config/middleware')
const articlesRouter = require('./controllers/articles')
const emailsRouter = require('./controllers/emails')

app.use(cors())
app.use(express.json())

app.use('/api/articles', articlesRouter)
app.use('/api/emails', emailsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app