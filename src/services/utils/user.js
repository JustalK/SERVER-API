'use strict'

const path = require('path')
const utils_password = require('@src/services/utils/password')
const utils_email = require('@src/services/utils/email')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const User = require('@src/models/' + filename)

/**
* Manage the mutations for the question model
**/
module.exports = {
  /**
  * Services for adding a new user
  * @params {Object} args The argument passed to the function
  **/
  add_user: async (args) => {
    const tmp_user = args

    // Check if the email is a real one
    const is_email = utils_email.check_email(args.email)
    if (!is_email) {
      throw new Error('This is not an email.')
    }

    // Check if an user with the same email exist
    const is_email_already_used = await module.exports.is_user_exist_by_email(args.email)
    if (is_email_already_used) {
      throw new Error('This email is already used by someone else.')
    }

    // Check if an user with the same username exist
    const is_username_already_used = await module.exports.is_user_exist_by_username(args.username)
    if (is_username_already_used) {
      throw new Error('This username is already used by someone else.')
    }

    // Check if the password is strong
    const is_password_not_strong = utils_password.check_new_password(
      args.password,
      ['has_lowercase', 'has_uppercase', 'has_number', 'has_enough_length']
    )
    if (is_password_not_strong) {
      throw new Error('This password is not strong enough. It must have a lowercase, an uppercase, a number and a length superior at ' + Number(process.env.PASSWORD_LIMIT_CHARACTER))
    }

    tmp_user.password = await utils_password.hash_password(tmp_user.password)
    const user = new User(args)
    return dbs.insert(user)
  },
  /**
  * Get an user by username or email
  * @params {String} login The username or email to search
  * @return {Object} The user found or null
  **/
  get_user_by_login: async login => {
    return dbs.get_one({ $or: [{ email: login }, { username: login }] })
  },
  /**
  * Test the an user exist in the db with the username specified
  * @params {String} username The username to test
  * @return {boolean} True if the username exist or else False
  **/
  is_user_exist_by_username: async username => {
    return dbs.test({ username: username })
  },
  /**
  * Test the email if a user exist in the db with this email
  * @params {String} email The email to test
  * @return {boolean} True if the user exist or else False
  **/
  is_user_exist_by_email: async email => {
    return dbs.test({ email: email })
  }
}
