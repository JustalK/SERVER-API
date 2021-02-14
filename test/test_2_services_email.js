'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')
const test = require('ava')
const m = require('@src')
const m_email = require('@src/services/utils/email')

test.before(async () => {
  await m.start()
})

test('[STATIC] send_email', async t => {
  const rsl = await m_email.send_email('justal.kevin@gmail.com')
  console.log(rsl)
  t.pass()
})
