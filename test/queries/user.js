'use strict'

require('module-alias/register')
const faker = require('faker')
const m_utils = require('@test/libs/utils')

module.exports = {
  create_new_random_user: async (password = null) => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: password || faker.internet.password()
    }

    return m_utils.getter({
      query: `
        mutation {
          signing(username: "${user.username}", email: "${user.email}", password: "${user.password}") {
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
  get_all_users: async token => {
    return m_utils.getter({
      query: `
        query {
          get_all_users {
            _id
            email
            username
          }
        }`
    }, token)
  },
  get_all_users_with_limit: async (limit, token) => {
    return m_utils.getter({
      query: `
        query {
          get_all_users(limit: ${limit}) {
            _id
            email
            username
          }
        }`
    }, token)
  },
  get_all_users_with_username: async (username, token) => {
    return m_utils.getter({
      query: `
        query {
          get_all_users(username: "${username}") {
            _id
            email
            username
          }
        }`
    }, token)
  }
}
