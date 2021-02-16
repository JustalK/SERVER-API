'use strict'

require('module-alias/register')
const m_utils = require('@test/libs/utils')

module.exports = {
  send_recovery_email: async email => {
    return m_utils.getter({
      query: `
        query {
          send_recovery_email(login: "${email}")
        }`
    })
  }
}
