'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/libs/string')

test('[STATIC] Capitalize', t => {
  const rsl_capitalized = m.capitalize('aaa')
  t.is(rsl_capitalized, 'Aaa')
})
