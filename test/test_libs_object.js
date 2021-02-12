'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/libs/object')

test('[STATIC] clean_values', t => {
  const object = {
    test_1: 'aaa ',
    test_2: 'bbb',
    test_3: null
  }
  const rsl = m.clean_values(object)
  t.is(rsl.test_1, 'aaa')
  t.is(rsl.test_2, 'bbb')
  t.is(rsl.test_3, null)
})
