/**
* The models of the recover_token
* @module models/token
*/
'use strict'

const mongoose = require('mongoose')
const path = require('path')
const filename = path.basename(__filename, '.js')

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  token: {
    type: String,
    uppercase: true,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true
  },
  used: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  collection: filename,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  admin_bro: {
    listProperties: ['user', 'date']
  }
})

module.exports = mongoose.model(filename, schema)
