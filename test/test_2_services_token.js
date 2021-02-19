'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/services/utils/recover_token')

test('[STATIC] get_informations_from_recover_token with empty argument', t => {
  t.throws(() => { m.get_informations_from_recover_token(null) })
})

test('[STATIC] get_informations_from_recover_token with bad argument', t => {
  t.throws(() => { m.get_informations_from_recover_token('aaaa') })
})
