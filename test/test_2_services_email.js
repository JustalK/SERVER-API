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

test('[STATIC] Trying to send_email with bad mail', async t => {
  await t.throwsAsync(async () => { await m_email.send_email({}) })
})

test('[STATIC] send_email', async t => {
  const mail = m_email.prepare_email({
    to: 'justal.kevin@gmail.com',
    subject: 'Test Subject',
    html: 'Test Content'
  })
  const rsl = await m_email.send_email(mail)
  t.is(rsl.message, 'Queued. Thank you.')
})
