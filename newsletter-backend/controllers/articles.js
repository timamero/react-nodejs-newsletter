const articlesRouter = require('express').Router()
const Article = require('../models/article')
const showdown = require('showdown')

const converter = new showdown.Converter()
converter.setFlavor('github');
converter.setOption('simpleLineBreaks', 'true');
converter.setOption('noHeaderId', 'true');
converter.setOption('headerLevelStart', '2');

articlesRouter.get('/', (request, response) => {
  
  Article.find({}).then(articles => response.json(articles))
})

articlesRouter.get('/:id', (request, response) => {
  const id = request.params.id
  
  const article = Article.findById(id).then(article => {
    const articleWithContentConverted = {
      ...article,
      content: converter.makeHtml(article.content)
    }

    if (article) {
      response.json(articleWithContentConverted)
    } else {
      response.status(404).end()
    } 
  })
})

articlesRouter.get('/edit/:id', (request, response) => {
  const id = request.params.id

  const article = Article.findById(id).then(article => {
    if (article) {
      response.json(article)
    } else {
      response.status(404).end()
    } 
  }) 
})


articlesRouter.post('/', (request, response) => {
  const body = request.body

  const article = new Article({
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
  })
  
  article.save()
    .then(savedArticle => response.json(savedArticle))

})

articlesRouter.put('/:id', (request, response) => {
  const body = request.body
  
  const updatedArticle = {
    id: Number(request.params.id),
    title: body.title,
    slug: body.title.toLowerCase().split(' ').join('-'),
    creationDate: body.creationDate,
    lastUpdateDate: new Date(),
    publishDate: body.publishDate,
    authors: body.authors,
    content: body.content,
    isPublished: body.isPublished,
    isEmailed: body.isEmailed,
    likes: body.likes
  }

  articles = articles.map(article => {
    if (article.id !== Number(request.params.id)) {
      return article
    } else {
      return updatedArticle
    }
  })

  response.json(updatedArticle)
})

articlesRouter.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  article = articles.filter(article => article.id !== id)

  response.status(204).end()
})

module.exports = articlesRouter