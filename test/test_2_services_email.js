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

test('[STATIC] Trying to get_html_template_from_path that does not exist', t => {
  t.throws(() => { m_email.get_html_template_from_path(null) })
})

test('[STATIC] send_email', async t => {
  const mail = m_email.forgotten_password_email(process.env.FROM_EMAIL)
  const rsl = await m_email.send_email(mail)
  t.is(rsl.message, 'Queued. Thank you.')
})
