/**
* The queries for the email
* @module queries/email
*/
'use strict'

const utils_user = require('@src/services/utils/user')
const utils_email = require('@src/services/utils/email')
const libs_logger = require('@src/libs/logger')

/**
* Manage the utils function for the config
**/
module.exports = {
  /**
  * Return the config of the application
  * @return {Config} Return the config of the application
  **/
  send_recovery_email: async (_, args) => {
    libs_logger.log('Send new recovery email', { args })
    // Check if an account exist for the user
    const user = await utils_user.get_user_by_login(args.login)
    if (user === null) {
      throw new Error('This account does not exist.')
    }

    const informations = await utils_email.forgotten_password_email(user)
    utils_email.send_email(informations.mail)
    return informations.token
  }
}
