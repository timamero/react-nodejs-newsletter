const articlesRouter = require('express').Router()
const Article = require('../models/article')
const showdown = require('showdown')
const xss = require('xss')
const sendArticle = require('../config/middleware').sendArticle

const converter = new showdown.Converter()
converter.setFlavor('github')
converter.setOption('simpleLineBreaks', 'true')
converter.setOption('noHeaderId', 'true')
converter.setOption('headerLevelStart', '2')

articlesRouter.get('/', (request, response, next) => {
  Article.find({})
    .then(articles => (
      articles.map(article => {
        const convertedArticleContent = converter.makeHtml(article.content)
        const cleanedArticleContent = xss(convertedArticleContent)

        const articleObjectToReturn = {
          id: article._id.toString(),
          title: article.title,
          slug: article.slug,
          creationDate: article.creationDate,
          lastUpdateDate: article.lastUpdateDate,
          publishDate: article.publishDate,
          authors:article.authors,
          content: cleanedArticleContent,
          isPublished: article.isPublished,
          isEmailed: article.isEmailed,
          likes: article.likes
        }
        return articleObjectToReturn
      })
    ))
    .then(convertedArticles => {
      response.json(convertedArticles)
    })
    .catch(error => next(error))
})

articlesRouter.get('/:id', (request, response, next) => {
  const id = request.params.id

  Article.findById(id)
    .then(article => {
      const convertedArticleContent = converter.makeHtml(article.content)
      const cleanedArticleContent = xss(convertedArticleContent)

      const formattedContentArticle = {
        id: article._id.toString(),
        title: article.title,
        slug: article.slug,
        creationDate: article.creationDate,
        lastUpdateDate: article.lastUpdateDate,
        publishDate: article.publishDate,
        authors:article.authors,
        content: cleanedArticleContent,
        isPublished: article.isPublished,
        isEmailed: article.isEmailed,
        likes: article.likes
      }

      if (article) {
        response.json(formattedContentArticle)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

articlesRouter.get('/edit/:id', (request, response, next) => {
  const id = request.params.id
  Article.findById(id)
    .then(article => {
      if (article) {
        response.json(article)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

articlesRouter.post('/', (request, response, next) => {
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
    .catch(error => next(error))

})

articlesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const updatedArticle = {
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

  Article.findByIdAndUpdate(request.params.id, updatedArticle, { new: true })
    .then(returnedArticle => {
      response.json(returnedArticle)
    })
    .catch(error => next(error))
})

articlesRouter.put('/send/:id', (request, response, next) => {
  const body = request.body

  const updatedArticle = {
    title: body.title,
    slug: body.title.toLowerCase().split(' ').join('-'),
    creationDate: body.creationDate,
    lastUpdateDate: new Date(),
    publishDate: body.publishDate,
    authors: body.authors,
    content: body.content,
    isPublished: body.isPublished,
    isEmailed: true,
    likes: body.likes
  }

  Article.findByIdAndUpdate(request.params.id, updatedArticle, { new: true })
    .then(returnedArticle => {
      response.json(returnedArticle)
      next()
    })
    .catch(error => next(error))
}, sendArticle)

articlesRouter.delete('/:id', (request, response, next) => {
  Article.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

module.exports = articlesRouter