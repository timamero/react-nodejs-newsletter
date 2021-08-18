require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const articlesRouter = require('./controllers/articles')
const emailsRouter = require('./controllers/emails')

app.use(cors())
app.use(express.json())

app.use('/api/articles', articlesRouter)
app.use('/api/emails', emailsRouter)


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
