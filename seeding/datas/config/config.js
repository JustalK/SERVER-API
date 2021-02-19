'use strict'

const mongoose = require('mongoose')

module.exports = [
  {
    password_minimum_character: 5,
    password_restriction: ['has_lowercase', 'has_uppercase', 'has_number', 'has_enough_length'],
    default_user_type: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2aa002')
  }
]
