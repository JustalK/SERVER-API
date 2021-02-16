'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('module-alias/register')
const test = require('ava')
const m = require('@src/libs/encryption')

test('[STATIC] encrypt a user id', t => {
  const data_encrypted = m.encrypt('5fd5b58efbc2f7a33c2ab000')
  t.not(data_encrypted.content, undefined)
  t.not(data_encrypted.iv, undefined)
})

test('[STATIC] decrypt encrypted data', t => {
  const data_encrypted = {
    iv: '2662395a24030edae2656c3b3e790ae6',
    content: '874de9d4de31b0443b963e315af8262429e930393f0573b9'
  }
  const data_decrypted = m.decrypt(data_encrypted)
  t.is(data_decrypted, '5fd5b58efbc2f7a33c2ab000')
})
