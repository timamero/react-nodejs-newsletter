const articlesRouter = require('express').Router()
const Article = require('../models/article')
const AuthorUser = require('../models/authorUser')
const jwt = require('jsonwebtoken')
const tokenExtractor = require('../util/middleware').tokenExtractor
const sendArticle = require('../util/middleware').sendArticle
const convertMarkdownToHtml = require('../util/helper').convertMarkdownToHtml

articlesRouter.get('/', (request, response, next) => {
  Article.find({})
    .populate('authorUser', { username: 1, name: 1 })
    .then(articles => (
      articles.map(article => {

        const articleObjectToReturn = {
          id: article._id.toString(),
          title: article.title,
          slug: article.slug,
          creationDate: article.creationDate,
          lastUpdateDate: article.lastUpdateDate,
          publishDate: article.publishDate,
          authors:article.authors,
          content: article.content,
          isPublished: article.isPublished,
          isEmailed: article.isEmailed,
          likes: article.likes,
          authorUser: article.authorUser
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
    .populate('authorUser', { username: 1, name: 1 })
    .then(article => {

      const formattedContentArticle = {
        id: article._id.toString(),
        title: article.title,
        slug: article.slug,
        creationDate: article.creationDate,
        lastUpdateDate: article.lastUpdateDate,
        publishDate: article.publishDate,
        authors:article.authors,
        content: convertMarkdownToHtml(article.content),
        isPublished: article.isPublished,
        isEmailed: article.isEmailed,
        likes: article.likes,
        authorUser: article.authorUser
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
    .populate('authorUser', { username: 1, name: 1 })
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

  const token =  tokenExtractor(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  AuthorUser.findById(decodedToken.id)
    .then(returnedAuthorUser => {
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
        likes: 0,
        authorUser: returnedAuthorUser._id
      })

      article.save()
        .then(savedArticle => {
          returnedAuthorUser.articles = returnedAuthorUser.articles.concat(savedArticle._id)
          returnedAuthorUser.save()
          return response.json(savedArticle)
        })
        .catch(error => next(error))
    })
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
  Article.findById(request.params.id)
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