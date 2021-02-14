'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/services/utils/password')

test('[STATIC] hash_password with null argument', async t => {
  const rsl = await m.hash_password('password')
  t.not(rsl, undefined)
})

test('[STATIC] hash_password with alternative_salt argument', async t => {
  const rsl = await m.hash_password('password', 10)
  t.not(rsl, undefined)
})

test('[STATIC] check_new_password with no condition', async t => {
  const rsl = await m.check_new_password('password')
  t.is(rsl, false)
})
