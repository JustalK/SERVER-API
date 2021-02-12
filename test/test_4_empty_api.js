require('module-alias/register')

require('dotenv').config({ path: './env/.env.production' })
require('isomorphic-fetch')
require('module-alias/register')

const test = require('ava')
const m = require('@src')
const queries_user = require('@test/queries/user')
const queries_auth = require('@test/queries/auth')
const queries_config = require('@test/queries/config')

test.before(async () => {
  await m.start()
})

test('[USER] Trying to access config with user profile', async t => {
  const response_user = await queries_user.create_new_random_user({ password: 'Q@sDwerty10' })
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')
  const response = await queries_config.get_config(response_login.login.token)

  t.is(response.errors[0].message, 'You do not have enough permission for this request.')
})

test('[USER] Trying to subscribe with wrong email', async t => {
  const response = await queries_user.create_new_random_user({
    email: 'test'
  })

  t.is(response.errors[0].message, 'This is not an email.')
})

test('[STATIC] Testing access to the app', async t => {
  const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + '/')
  const response_json = await response.json()
  t.is(response_json.status, 'working')
})

test('[STATIC] Testing access to the documentation', async t => {
  const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + '/documentation')
  t.is(response.status, 200)
})
