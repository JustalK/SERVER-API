'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/server')

test('[STATIC] Testing the error of the server', async t => {
  const promise = new Promise((resolve, reject) => {
    m.callback({ test: 'test' }, resolve, reject)
  })
  const error = await t.throwsAsync(promise)
  t.is(error.message, 'Server fail to start !')
})
