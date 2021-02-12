'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/services/utils/user_type')

test('[STATIC] get_user_type_by_name with bad argument', t => {
  t.throws(() => { m.get_user_type_by_name(null) })
})
