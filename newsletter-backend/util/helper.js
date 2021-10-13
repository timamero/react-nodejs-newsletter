const showdown = require('showdown')
const xss = require('xss')

const converter = new showdown.Converter()
converter.setFlavor('github')
converter.setOption('simpleLineBreaks', 'true')
converter.setOption('noHeaderId', 'true')
converter.setOption('headerLevelStart', '2')

const convertMarkdownToHtml = (content) => {
  const convertedContent = converter.makeHtml(content)
  const cleanedContent = xss(convertedContent)
  return cleanedContent
}

module.exports = {
  convertMarkdownToHtml
}