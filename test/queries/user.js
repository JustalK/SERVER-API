'use strict'

require('module-alias/register')
const faker = require('faker')
const m_utils = require('@test/libs/utils')

module.exports = {
  create_new_random_user: async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
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
  }
}
