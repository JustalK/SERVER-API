/**
* The models of the config
* @module models/config
*/
'use strict'

const mongoose = require('mongoose')
const path = require('path')
const filename = path.basename(__filename, '.js')

const schema = new mongoose.Schema({
  password_minimum_character: {
    type: Number,
    require: true
  },
  default_user_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_type',
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
    listProperties: ['password_minimum_character', 'default_user_type']
  }
})

module.exports = mongoose.model(filename, schema)
