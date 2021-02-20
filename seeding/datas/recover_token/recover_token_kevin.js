'use strict'

const mongoose = require('mongoose')

module.exports = [
  {
    user: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2ab001'),
    token: 'aaaaaaaaaaaaaaaaaaaaxaaaaaaaaaaaaaaaaaaa',
    date: Date.now(),
    deleted: false,
    used: false
  },
  {
    user: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2ab001'),
    token: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    date: Date.now(),
    deleted: true,
    used: true
  }
]
