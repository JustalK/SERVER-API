'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('module-alias/register')
const test = require('ava')
const m = require('@src/services/utils/user')

test('[STATIC] edit_user_by_user with bad argument', async t => {
  await t.throwsAsync(async () => { await m.edit_user_by_user({}, {}) })
})
