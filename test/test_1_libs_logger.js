'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/libs/logger')

test('[STATIC] log not activate', t => {
  const rsl = m.log('test', {}, 'info', false)
  t.is(rsl, false)
})

test('[STATIC] log activate', t => {
  const rsl = m.log('test', {}, 'info', 'TRUE')
  t.is(rsl, true)
})

test('[STATIC] info not activate', t => {
  const rsl = m.info('test', {}, false)
  t.is(rsl, false)
})

test('[STATIC] info activate', t => {
  const rsl = m.info('test', {}, 'TRUE')
  t.is(rsl, true)
})
