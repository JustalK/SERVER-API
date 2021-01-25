'use strict'

require('module-alias/register')
const m_utils = require('@test/libs/utils')

module.exports = {
  login_admin: async () => {
    return m_utils.getter({
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
  }
}
