'use strict'

require('module-alias/register')
const faker = require('faker')
const m_utils = require('@test/libs/utils')

module.exports = {
  create_new_random_user: async ({ email = faker.internet.email(), username = faker.internet.userName(), password = 'Awer96@sadasdDD' }) => {
    return m_utils.getter({
      query: `
        mutation {
          signing(username: "${username}", email: "${email}", password: "${password}") {
            user {
              _id
              email
              username
            }
            token
          }
        }`
    })
  },
  create_new_random_admin: async ({ email = faker.internet.email(), username = faker.internet.userName(), password = 'Awer96@sadasdDD' }) => {
    return m_utils.getter({
      query: `
        mutation {
          create_admin_account(username: "${username}", email: "${email}", password: "${password}") {
            _id
            email
            username
            user_type {
              name
            }
          }
        }`
    })
  },
  get_user_from_token: recover_token => {
    return m_utils.getter({
      query: `
        query {
          get_user_from_token(recover_token: "${recover_token}") {
            _id
            email
            username
            user_type {
              name
            }
          }
        }`
    })
  },
  change_password_user: (password, recover_token) => {
    return m_utils.getter({
      query: `
        mutation {
          change_password_user(password: "${password}", recover_token: "${recover_token}")
        }`
    })
  },
  edit_user: async (user_id) => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email()
    }
    return m_utils.getter({
      query: `
        mutation {
          edit_user_account(user_id: "${user_id}", username: "${user.username}", email: "${user.email}") {
            email
            username
          }
        }`
    })
  },
  get_all_users: async ({ limit = null, sort = null, order = null, joint = null, username = null, email = null }, token) => {
    const params = []
    limit && params.push(`limit: ${limit}`)
    sort && params.push(`sort: "${sort}"`)
    order && params.push(`order: "${order}"`)
    joint && params.push(`joint: "${joint}"`)
    username && params.push(`username: "${username}"`)
    email && params.push(`email: "${email}"`)
    return m_utils.getter({
      query: `
        query {
          get_all_users${params.length > 0 ? '(' + params.join() + ')' : ''} {
            _id
            email
            username
          }
        }`
    }, token)
  }
}
