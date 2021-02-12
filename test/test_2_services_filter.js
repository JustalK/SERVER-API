'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/services/utils/filter')
const constants = require('@src/libs/constants')
const model = require('@src/models/user')

test('[STATIC] handle_limit_argument with null argument', t => {
  const rsl = m.handle_limit_argument(null)
  t.is(rsl, null)
})

test('[STATIC] handle_limit_argument', t => {
  const rsl = m.handle_limit_argument(10)
  t.is(rsl, 10)
})

test('[STATIC] handle_order_argument', t => {
  const rsl = m.handle_order_argument(constants.order_descending)
  t.is(rsl, constants.order_descending)
})

test('[STATIC] handle_order_argument with bad argument', t => {
  t.throws(() => { m.handle_order_argument('test') })
})

test('[STATIC] handle_sort_argument', t => {
  const rsl = m.handle_sort_argument('username', model)
  t.is(rsl, 'username')
})

test('[STATIC] handle_sort_argument with bad argument', t => {
  t.throws(() => { m.handle_sort_argument('test', model) })
})

test('[STATIC] handle_joint_argument', t => {
  const rsl = m.handle_joint_argument(constants.joint_and, model)
  t.is(rsl, constants.joint_and)
})

test('[STATIC] handle_joint_argument with bad argument', t => {
  t.throws(() => { m.handle_joint_argument('test') })
})
