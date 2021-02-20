const crons = require('node-cron')
const utils_recover_token = require('@src/services/utils/recover_token')

module.exports = {
  /**
  * Invalid outdated token every minute
  **/
  invalid_outdated_token: () => {
    crons.schedule('* * * * *', utils_recover_token.invalid_outdated_token)
  }
}
