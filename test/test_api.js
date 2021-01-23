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
          user {
            username
            email
          }
          token
        }
      }`
  })

  t.is(response.login.user.username, 'admin')
  t.is(response.login.user.email, 'admin@gmail.com')
  t.not(response.login.token, undefined)
})

test('[STATIC] Subscribe', async t => {
  const response = await m_utils.getter({
    query: `
      mutation {
        signing(username: "robert", email: "robert@gmail.com", password: "FrsdsdstSc8@") {
          user {
            email
          }
          token
        }
      }`
  })

  t.not(response.signing.user.username, 'robert')
  t.is(response.signing.user.email, 'robert@gmail.com')
  t.not(response.signing.token, undefined)
})

test('[STATIC] Get the config', async t => {
  const response = await m_utils.getter({
    query: `
      query {
        get_config {
          password_limit_character
          default_user_type {
            name
            permission_level
          }
        }
      }`
  })

  t.not(response.get_config.password_limit_character, undefined)
  t.not(response.get_config.default_user_type.name, undefined)
  t.not(response.get_config.default_user_type.permission_level, undefined)
})
