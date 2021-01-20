require('dotenv').config({ path: './env/.env.production' })
require('isomorphic-fetch')

const test = require('ava')
const m = require('../src')
const m_seeding = require('../seeding/seeder')
const m_utils = require('./libs/utils')

test.before(async () => {
  await m.start()
  await m_seeding.seed()
})

test('[STATIC] Login', async t => {
  const response = await m_utils.getter({
    query: `
      mutation {
        login(login: "admin", password: "azerty") {
          username
          email
          token
        }
      }`
  })

  t.is(response.login.username, 'admin')
  t.is(response.login.email, 'admin@gmail.com')
  t.not(response.login.token, undefined)
})

test('[STATIC] Subscribe', async t => {
  const response = await m_utils.getter({
    query: `
      mutation {
        signing(username: "robert", email: "robert@gmail.com", password: "FrsdsdstSc8@") {
          email
          token
        }
      }`
  })

  console.log(response)
  t.not(response.login.username, 'robert')
  t.is(response.login.email, 'robert@gmail.com')
  t.not(response.login.token, undefined)
})
