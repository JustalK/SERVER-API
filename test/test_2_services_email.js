'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')
const test = require('ava')
const m_email = require('@src/services/utils/email')

test('[STATIC] Trying to send_email with bad mail', async t => {
  await t.throwsAsync(async () => { await m_email.send_email({}) })
})

test('[STATIC] Trying to get_html_template_from_path that does not exist', t => {
  t.throws(() => { m_email.get_html_template_from_path(null) })
})
