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
  get_all_users_sorted_ordered: async (sort, order, token) => {
    return m_utils.getter({
      query: `
        query {
          get_all_users(sort: "${sort}", order: "${order}") {
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
  },
  get_all_users_with_email: async (email, token) => {
    return m_utils.getter({
      query: `
        query {
          get_all_users(email: "${email}") {
            _id
            email
            username
          }
        }`
    }, token)
  },
  get_all_users_with_username_joint_email: async (username, email, joint, token) => {
    return m_utils.getter({
      query: `
        query {
          get_all_users(username: "${username}", email: "${email}", joint: "${joint}") {
            _id
            email
            username
          }
        }`
    }, token)
  }
}
