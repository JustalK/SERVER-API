'use strict'

const mongoose = require('mongoose')

module.exports = [
  {
    password_minimum_character: 5,
    default_user_type: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2aa002')
  }
]
