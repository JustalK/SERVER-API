'use strict'

require('dotenv').config({ path: './env/.env.production' })
require('isomorphic-fetch')
require('module-alias/register')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')
const queries_user = require('@test/queries/user')
const queries_auth = require('@test/queries/auth')
const queries_config = require('@test/queries/config')

test.before(async () => {
  await m.start()
  await m_seeding.seed()
})

test('[STATIC] Login', async t => {
  const response = await queries_auth.login_admin()

  t.is(response.login.user.username, 'admin')
  t.is(response.login.user.email, 'admin@gmail.com')
  t.not(response.login.token, undefined)
})

test('[STATIC] Subscribe', async t => {
  const response = await queries_user.create_new_random_user()

  t.not(response.signing.user.username, undefined)
  t.not(response.signing.user.email, undefined)
  t.not(response.signing.token, undefined)
})

test('[STATIC] Get the config', async t => {
  const response_login = await queries_auth.login_admin()

  const response = await queries_config.get_config(response_login.login.token)

  t.not(response.get_config.password_minimum_character, undefined)
  t.not(response.get_config.default_user_type.name, undefined)
  t.not(response.get_config.default_user_type.permission_level, undefined)
})
