const emailsRouter = require('express').Router()

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

emailsRouter.get('/', (request, response) => {
  response.json(emails)
})

const generateId = () => {
  const maxId = emails.length > 0
    ? Math.max(...emails.map(e => e.id))
    : 0
  return maxId + 1
}

emailsRouter.post('/', (request, response) => {
  const body = request.body

  const email = {
    id: generateId(),
    email: body.email
  }

  emails = emails.concat(email)

  response.json(email)
})

emailsRouter.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  emails = emails.filter(email => email.id !== id)

  response.status(204).end()
})

module.exports = emailsRouter