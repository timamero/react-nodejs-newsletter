require('dotenv').config()
const express = require('express')
const app = express()
const articlesRouter = require('./controllers/articles')

app.use(express.json())

app.use('/api/articles', articlesRouter)

let emails = [
  {
    id: 1,
    email: "roy@example.com"
  },
  {
    id: 2,
    email: "jess@example.com"
  }
]

app.get('/api/emails', (request, response) => {
  response.json(emails)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
