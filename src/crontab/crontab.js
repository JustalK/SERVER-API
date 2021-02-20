const cron_recover_token = require('@src/crontab/cron/recover_token')

module.exports = {
  start: () => {
    cron_recover_token.invalid_outdated_token()
  }
}
