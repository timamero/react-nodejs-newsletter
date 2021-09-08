const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
})

emailSchema.plugin(uniqueValidator)

// https://mongoosejs.com/docs/api.html#document_Document-toObject
emailSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Email', emailSchema)