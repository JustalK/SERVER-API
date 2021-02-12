'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/libs/utils')

test('[STATIC] Mode', t => {
  const mode = m.mode('production')
  t.is(mode, 'production')
})

test('[STATIC] Mode with undefine', t => {
  const mode = m.mode(undefined)
  t.is(mode, 'development')
})
