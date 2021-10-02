const mongoose = require('mongoose')

const previewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '`Title` is required'],
  },
  slug: String,
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
  // likes: Number,
  // isPublished: Boolean,
  // isEmailed: Boolean,
})

// https://mongoosejs.com/docs/api.html#document_Document-toObject
previewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Preview', previewSchema)