const logger = require('./logger')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const showdown = require('showdown')
const Email = require('../models/email')
const Article = require('../models/article')

const converter = new showdown.Converter()
converter.setFlavor('github')
converter.setOption('simpleLineBreaks', 'true')
converter.setOption('noHeaderId', 'true')
converter.setOption('headerLevelStart', '2')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: `Validation Error: ${error.message}` })
  } else if (error.name === 'MongoError') {
    return response.status(400).send({ error: `Mongo Error: ${error.message}` })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  logger.error(error.message)

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const sendWelcomeMessage = (request, response, next) => {
  const unsubscribeURL = 'http://localhost:3000/unsubscribe'
  const from = 'welcome@newsletter.com'
  const subject = 'Newsletter Subscription Confirmation'
  const text = `Welcome to the newsletter  
Thank you for subscribing!  
Go to ${unsubscribeURL} to unsubscribe
`
  const htmlStream = fs.createReadStream(`${process.env.FILE_PATH}/communication/welcome.html`)
  htmlStream.on('error', () => {
    logger.error('htmlStream error')
  })

  const welcomeMessage = {
    from: from,
    subject: subject,
    text: text,
    html: htmlStream,
  }

  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // verify connection configuration
  transporter.verify((error, success) => {
    if (error) {
      htmlStream.destroy()
      logger.error('Error:', error)
    } else {
      logger.info('Ready to send messages...')
    }
  })

  welcomeMessage.to = request.body.email

  transporter.sendMail(welcomeMessage, (err, info) => {
    if (err) {
      logger.error('Error:', err)
    } else {
      logger.info('Message sent')
    }
  })

  htmlStream.on('close', () => {
    logger.info('htmlStream closed')
  })
}

const htmlToPlainText = html => {
  const openingTagRegex = /<\w+>/ig
  const closingTagRegex = /<\/\w+>/ig
  const emptyTag = /<(\w+)(\s*)(\/)>/g
  const imageTagRegex = /(<img\ssrc=")((http)(s*)(:\/\/)(.+?))("\salt=")(.+?)(".+?\/>)/ig
  const linkTagRegex = /(<a\shref=")((http)(s*)(:\/\/)(.+?))(">)(.+?<\/a>)/ig

  return html
    .replace(emptyTag, '')
    .replace(linkTagRegex, '$2')
    .replace(imageTagRegex, '$8 - $2')
    .replace(openingTagRegex, '')
    .replace(closingTagRegex, '\n')
}

const formatHtml = html => {
  const imageTagRegex = /(<img\ssrc=")(http.+?)(\/>)/ig
  return html.replace(imageTagRegex, '$1$2 style="width: 400px" $3')
}

const sendArticle = async (request, response, next) => {
  const articleObject = await Article.findById(request.params.id)

  const emailsObjects = await Email.find({})
  const emails = emailsObjects.map(obj => obj.email)
  const bcc = emails
  const from = 'welcome@newsletter.com'
  const subject = `Newsletter - ${articleObject.title}`

  let htmlBody = converter.makeHtml(articleObject.content)
  const articleFooter = fs.readFileSync(path.resolve(`${process.env.FILE_PATH}/communication/`, 'articleFooter.html'), 'utf-8')
  const html = htmlBody.concat(articleFooter)
  const text = htmlToPlainText(html)

  // console.log('test html', html)

  const testMessage = {
    bcc: bcc,
    from: from,
    subject: subject,
    text: text,
    html: formatHtml(html),
  }

  let transporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 2,
    maxMessages: 5,
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // verify connection configuration
  transporter.verify((error, success) => {
    if (error) {
      logger.error('Error:', error)
    } else {
      logger.info('Ready to send messages...')
    }
  })

  transporter.sendMail(testMessage, (err, info) => {
    if (err) {
      logger.error('Error:', err)
    } else {
      logger.info('Message sent')
      transporter.close()
    }
  })
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  sendWelcomeMessage,
  sendArticle,
  tokenExtractor
}