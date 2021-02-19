/**
* The mutation for auth
* @module mutations/auth
*/
'use strict'

const utils_user = require('@src/services/utils/user')
const utils_auth = require('@src/services/utils/auth')
const utils_user_type = require('@src/services/utils/user_type')
const utils_password = require('@src/services/utils/password')
const libs_logger = require('@src/libs/logger')

module.exports = {
  /**
  * Signing to the application
  * @param {Object} _ The return value of the resolver (not needeed here)
  * @param {Object} args The argument passed to the function
  * @return {Object} The token and the user
  **/
  signing: async (_, args) => {
    libs_logger.log('New signing to the app', { args })

    // Get the default user type for the new user
    const default_user_type = await utils_user_type.get_default_user_type()
    args.user_type = default_user_type._id

    const user = await utils_user.add_user(args)
    const token = utils_auth.create_token(user)
    return { user: user._id, token: token }
  },
  /**
  * Login to the application
  * @param {Object} _ The return value of the resolver (not needeed here)
  * @param {Object} args The argument passed to the function
  * @return {Object} The token and the user
  **/
  login: async (_, args) => {
    libs_logger.log('New login to the app', { args })
    // Check if an account exist for the user
    const user = await utils_user.get_user_by_login(args.login)
    if (user === null) {
      throw new Error('This account does not exist.')
    }

    // Check if the password is the corect one
    const is_password_correct = await utils_password.compare_password_hash(args.password, user.password)
    if (!is_password_correct) {
      throw new Error('The password is not correct.')
    }

    const token = utils_auth.create_token(user)
    return { user: user._id, token: token }
  }
}
