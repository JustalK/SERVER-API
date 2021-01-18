'use strict'

const mongoose = require('mongoose')
const utils_password = require('../../../src/services/utils/password')
module.exports = [
  {
    id: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2ab000'),
    username: 'admin',
    email: 'admin@gmail.com',
    password: utils_password.hash_password('azerty')
  }
]
