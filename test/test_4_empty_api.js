require('module-alias/register')

require('dotenv').config({ path: './env/.env.production' })
require('isomorphic-fetch')
require('module-alias/register')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')
const queries_auth = require('@test/queries/auth')
const queries_config = require('@test/queries/config')

test.before(async () => {
  await m.start()
  // For filling up the admin only
  await m_seeding.seed('admin')
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

test('[STATIC] Access to the admin', async t => {
  const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + '/admin', {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + Buffer.from(process.env.USERNAME_ADMINBRO + ':' + process.env.PASSWORD_ADMINBRO).toString('base64')
    }
  })
  t.is(response.status, 200)
})

test('[STATIC] Trying to access to the admin', async t => {
  const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + '/admin')
  t.is(response.status, 401)
})

test('[ADMIN] Trying to access inexisting config', async t => {
  const response_login = await queries_auth.login_admin()

  const response = await queries_config.edit_config(response_login.login.token)
  t.is(response.errors[0].message, 'The config does not exist.')
})

test('[ADMIN] Trying to access config without token', async t => {
  const response = await queries_config.edit_config('')
  t.is(response.errors[0].message, 'Not Authorized.')
})
/**
test('[ADMIN] Trying to access config with really old token', async t => {
  const response = await queries_config.edit_config('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlX2dpdmVuIjoxNjEzMjE0NDUzMTY0LCJfaWQiOiI1ZmQ1YjU4ZWZiYzJmN2EzM2MyYWIwMDAiLCJpYXQiOjE2MTMyMTQ0NTMsImV4cCI6MTYxMzIxODA1M30.czTbSfBwF-rJIQSgKM-s9A9nGPQjb1DFi6bRTk7tdgo')
  t.is(response.errors[0].message, 'The token expired.')
})
**/
