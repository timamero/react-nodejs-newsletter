const previewRouter = require('express').Router()
const Preview = require('../models/preview')
const AuthorUser = require('../models/authorUser')
const jwt = require('jsonwebtoken')
const showdown = require('showdown')
const xss = require('xss')

const converter = new showdown.Converter()
converter.setFlavor('github')
converter.setOption('simpleLineBreaks', 'true')
converter.setOption('noHeaderId', 'true')
converter.setOption('headerLevelStart', '2')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

previewRouter.post('/', (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  AuthorUser.findById(decodedToken.id)
    .then(returnedAuthor => {

      const preview = new Preview({
        title: body.title,
        slug: body.slug,
        authors: body.authors,
        content: body.content,
        authorUser: returnedAuthor
      })

      preview.save()
        .then(savedPreview => {
          return response.json(savedPreview)
        })
        .catch(error => next(error))
    })

})

previewRouter.get('/', (request, response, next) => {
  Preview.find({})
    .then(previews => {
      if (previews) {
        response.json(previews)
      } else {
        return response.status(400).end()
      }
    })
    .catch(error => next(error))
})

previewRouter.get('/:id', (request, response, next) => {

  Preview.findById(request.params.id)
    .then(preview => {
      if (preview) {
        const convertedArticleContent = converter.makeHtml(preview.content)
        const cleanedArticleContent = xss(convertedArticleContent)

        const formattedContentPreview = {
          title: preview.title,
          slug: preview.slug,
          authors: preview.authors,
          content: cleanedArticleContent,
          authorUser: preview.authorUser
        }

        response.json(formattedContentPreview)
      } else {
        return response.status(400).end()
      }
    })
    .catch(error => next(error))
})

previewRouter.get('/edit/:id', (request, response, next) => {

  Preview.findById(request.params.id)
    .then(preview => {
      if (preview) {
        response.json(preview)
      } else {
        return response.status(400).end()
      }
    })
    .catch(error => next(error))
})

previewRouter.delete('/:id', (request, response, next) => {
  Preview.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

previewRouter.delete('/', (request, response, next) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  AuthorUser.findById(decodedToken.id)
    .then(authorUser => {
      const id = authorUser._id.toString()
      Preview.find({})
        .then(previews => {
          previews.forEach(preview => {
            if (preview.authorUser.toString() === id) {
              preview.remove()
            }
          })
        })
    })
})

module.exports = previewRouter