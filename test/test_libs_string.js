'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/libs/string')

test('[STATIC] Capitalize', t => {
  const rsl_capitalized = m.capitalize('aaa')
  t.is(rsl_capitalized, 'Aaa')
})

test('[STATIC] Capitalize with error', t => {
  const rsl_capitalized = m.capitalize(null)
  t.is(rsl_capitalized, '')
})

test('[STATIC] Sanitize', t => {
  const rsl_sanitized = m.sanitize('aaa   ')
  t.is(rsl_sanitized, 'aaa')
})

test('[STATIC] Sanitize with error', t => {
  const rsl_sanitized = m.sanitize(null)
  t.is(rsl_sanitized, null)
})
