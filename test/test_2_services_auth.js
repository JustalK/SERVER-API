'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/services/utils/auth')

test('[STATIC] get_token_from_bearer with null argument', async t => {
  const rsl = m.get_token_from_bearer(null)
  t.is(rsl, null)
})

test('[STATIC] get_token_from_bearer with bad argument', async t => {
  const rsl = m.get_token_from_bearer('Bb asdasdasd')
  t.is(rsl, null)
})

test('[STATIC] get_token_from_bearer with good argument', async t => {
  const rsl = m.get_token_from_bearer('Bearer asdasdasd')
  t.is(rsl, 'asdasdasd')
})
