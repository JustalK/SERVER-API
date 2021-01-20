const mongoose = require('mongoose')
const path = require('path')
const filename = path.basename(__filename, '.js')

const schema = new mongoose.Schema({
  user_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_type',
    required: true
  },
  username: {
    type: String,
    trim: true,
    require: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    require: true
  },
  password: {
    type: String,
    trim: true,
    require: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  collection: filename,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

module.exports = mongoose.model(filename, schema)
