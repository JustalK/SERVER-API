/**
* The models of the user_type
* @module models/user_type
*/
'use strict'

const mongoose = require('mongoose')
const path = require('path')
const filename = path.basename(__filename, '.js')

const schema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
    trim: true,
    require: true
  },
  permission_level: {
    type: Number,
    require: true
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
    listProperties: ['name', 'permission_level']
  }
})

module.exports = mongoose.model(filename, schema)
