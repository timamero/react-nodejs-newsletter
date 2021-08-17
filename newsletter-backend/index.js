require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

let articles = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet 1",
    slug: "lorem-ipsum-dolor-sit-amet-1",
    creationDate: new Date("January 1, 2020"),
    lastUpdateDate: new Date("January 10, 2020"),
    publishDate: new Date("January 15, 2020"),
    authors: ["Jeremy H"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
    isPublished: true,
    isEmailed: true,
    likes: 5
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet 2",
    slug: "lorem-ipsum-dolor-sit-amet-2",
    creationDate: new Date("February 10, 2021"),
    lastUpdateDate: new Date("February 11, 2021"),
    publishDate: new Date("February 15, 2021"),
    authors: ["Christine M", "Jeremy H"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
    isPublished: true,
    isEmailed: true,
    likes: 1
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet 3",
    slug: "lorem-ipsum-dolor-sit-amet-3",
    creationDate: new Date("March 15, 2021"),
    lastUpdateDate: new Date("April 10, 2021"),
    publishDate: null,
    authors: ["Christine M"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
    isPublished: false,
    isEmailed: false,
    likes: 0
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet 4",
    slug: "lorem-ipsum-dolor-sit-amet-4",
    creationDate: new Date("June 20, 2021"),
    lastUpdateDate: new Date("July 1, 2021"),
    publishDate: null,
    authors: ["Christine M"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
    isPublished: false,
    isEmailed: false,
    likes: 0
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet 5",
    slug: "lorem-ipsum-dolor-sit-amet-5",
    creationDate: new Date("March 20, 2021"),
    lastUpdateDate: new Date("March 25, 2021"),
    publishDate: new Date("March 25, 2021"),
    authors: ["Olivia L"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
    isPublished: true,
    isEmailed: true,
    likes: 10
  }
]

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

app.get('/api/articles', (request, response) => {
  response.json(articles)
})

app.get('/api/articles/:id', (request, response) => {
  const id = Number(request.params.id)
  const article = articles.find(article => article.id === id)
  
  if (article) {
    response.json(article)
  } else {
    response.status(404).end()
  } 
})

const generateId = () => {
  const maxId = articles.length > 0
    ? Math.max(...articles.map(a => a.id))
    : 0
  return maxId + 1
}

app.post('/api/articles', (request, response) => {
  const body = request.body
  
  const article = {
    id: generateId(),
    title: body.title,
    slug: body.title.toLowerCase().split(' ').join('-'),
    creationDate: new Date(),
    lastUpdateDate: null,
    publishDate: null,
    authors: body.authors,
    content: body.content,
    isPublished: false,
    isEmailed: false,
    likes: 0
  }
  
  articles = articles.concat(article)

  response.json(article)
})

app.delete('/api/articles/:id', (request, response) => {
  const id = Number(request.params.id)
  article = articles.filter(article => article.id !== id)

  response.status(204).end()
})

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
