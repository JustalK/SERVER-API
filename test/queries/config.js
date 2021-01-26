'use strict'

require('module-alias/register')
const m_utils = require('@test/libs/utils')

module.exports = {
  get_config: async token => {
    return m_utils.getter({
      query: `
        query {
          get_config {
            password_minimum_character
            default_user_type {
              name
              permission_level
            }
          }
        }`
    }, token)
  },
  edit_config: async token => {
    return m_utils.getter({
      query: `
        mutation {
          edit_config(password_minimum_character: 2) {
            password_minimum_character
          }
        }`
    }, token)
  }
}
