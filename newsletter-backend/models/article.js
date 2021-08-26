const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, '`Title` is required']
    },
    slug: String,
    creationDate: Date,
    lastUpdateDate: Date,
    publishDate: Date,
    authors: {
      type: [String],
      validate: {
        validator: v => {
          return v.length !== 0
        },
        message: () => '`Authors` is required'
      }
    },
    content: {
      type: String,
      required: [true, '`Content` is required']
    },
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