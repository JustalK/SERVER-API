'use strict'

const utils_user = require('../utils/user')
const utils_auth = require('../utils/auth')
const utils_password = require('../utils/password')

/**
* Manage the queries for the authentification process
**/
module.exports = {
  /**
  * Signing to the application
  * @params {Object} _ The return value of the resolver (not needeed here)
  * @params {Object} args The argument passed to the function
  **/
  signing: async (_, args) => {
    const user = await utils_user.add_user(args)
    const token = utils_auth.create_token(user)

    return { ...user.toJSON(), token: token }
  },
  /**
  * Login to the application
  * @params {Object} _ The return value of the resolver (not needeed here)
  * @params {Object} args The argument passed to the function
  **/
  login: async (_, args) => {
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
    return { ...user.toJSON(), token: token }
  }
}
