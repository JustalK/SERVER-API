/**
* The utils function for managing the user
* @module utils/user
*/
'use strict'

const path = require('path')
const utils_password = require('@src/services/utils/password')
const utils_email = require('@src/services/utils/email')
const libs_object = require('@src/libs/object')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const User = require('@src/models/' + filename)

/**
* Manage the mutations for the question model
**/
module.exports = {
  /**
  * Services for adding a new user
  * @param {User} args The argument passed to the function
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
    await utils_password.check_password_strong_enough(args.password)

    tmp_user.password = await utils_password.hash_password(tmp_user.password)
    const user = new User(args)
    return dbs.insert(user)
  },
  edit_user_by_user: async (user, update) => {
    if (!module.exports.is_instanceof_user(user)) {
      throw new Error('This is not an user.')
    }
    const update_sanitized = libs_object.clean_values(update, false)

    return dbs.update_by_id(user._id, update_sanitized)
  },
  /**
  * Get an user by username or email
  * @param {String} login The username or email to search
  * @return {Object} The user found or null
  **/
  get_user_by_login: async login => {
    return dbs.get_user_by_login(login)
  },
  /**
  * Get an user by id
  * @param {String} id The id of the user to search
  * @return {Object} The user found or null
  **/
  get_user_by_id: async id => {
    return dbs.get_user_by_id(id)
  },
  /**
  * Return all the users
  * @param {Int} limit Limit the number of user returned
  **/
  get_all_users: async ({ limit = null, sort, order, username, email, joint }) => {
    return dbs.get_all_users({ limit, sort, order, joint, username, email })
  },
  /**
  * Test the an user exist in the db with the username specified
  * @param {String} username The username to test
  * @return {boolean} True if the username exist or else False
  **/
  is_user_exist_by_username: async username => {
    return dbs.test_user_by_username(username)
  },
  /**
  * Test the email if a user exist in the db with this email
  * @param {String} email The email to test
  * @return {boolean} True if the user exist or else False
  **/
  is_user_exist_by_email: async email => {
    return dbs.test_user_by_email(email)
  },
  /**
  * Test if the user is an instance of user
  * @param {Object} user The object user to test
  * @return {boolean} True if it's an object user or else false
  **/
  is_instanceof_user: user => {
    return user instanceof User
  }
}
