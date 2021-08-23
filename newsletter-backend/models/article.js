const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: String,
    slug: String,
    creationDate: Date,
    lastUpdateDate: Date,
    publishDate: Date,
    authors: [String],
    content: String,
    isPublished: Boolean,
    isEmailed: Boolean,
    likes: Number
})

// https://mongoosejs.com/docs/api.html#document_Document-toObject
articleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Article', articleSchema)