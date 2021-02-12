'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/services/utils/config')

test('[STATIC] edit_config_by_config with bad argument', async t => {
  await t.throwsAsync(async () => { await m.edit_config_by_config({}, {}) })
})
