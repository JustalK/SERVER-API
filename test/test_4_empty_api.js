require('module-alias/register')

require('dotenv').config({ path: './env/.env.production' })
require('isomorphic-fetch')
require('module-alias/register')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')

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
