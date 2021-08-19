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

emailsRouter.delete('/:email', (request, response) => {
  const regex = /[@\\.]/g
  const email = request.params.email
  const emailObject = emails.find(e => e.email.replace(regex, '-') === email)
  
  if (!emailObject) {
    return response.status(404).end()
  }
  
  emails = emails.filter(e => e.email.replace(regex,'-') !== email)

  response.status(204).end()
})

module.exports = emailsRouter