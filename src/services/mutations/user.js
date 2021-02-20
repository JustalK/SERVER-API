/**
* The mutation for user
* @module mutations/user
*/
'use strict'

const utils_user = require('@src/services/utils/user')
const utils_user_type = require('@src/services/utils/user_type')
const utils_password = require('@src/services/utils/password')
const utils_recover_token = require('@src/services/utils/recover_token')
const libs_logger = require('@src/libs/logger')

module.exports = {
  /**
  * Edit an user
  * @param {Object} _ The return value of the resolver (not needeed here)
  * @param {Object} args The argument passed to the function
  * @return {Object} The edited user
  **/
  edit_user_account: async (_, args) => {
    libs_logger.log('New edit of an user account', { args })
    // Check if an account exist for the user
    const user = await utils_user.get_user_by_id(args.user_id)
    if (user === null) {
      throw new Error('This account does not exist.')
    }

    const user_type = await utils_user_type.get_user_type_by_id(user.user_type)
    if (user_type.permission_level >= 99) {
      throw new Error('This account cannot be edited with this request.')
    }

    const update = args
    delete update.user_id

    return utils_user.edit_user_by_user(user, update)
  },
  /**
  * Edit an user
  * @param {Object} _ The return value of the resolver (not needeed here)
  * @param {Object} args The argument passed to the function
  * @return {Object} The new admin account
  **/
  create_admin_account: async (_, args) => {
    libs_logger.log('New creationg of an admin account', { args })

    // Get the admin user type for the new admin
    const user_type_admin = await utils_user_type.get_user_type_by_name('ADMIN')
    args.user_type = user_type_admin._id

    const user = await utils_user.add_user(args)
    return user
  },
  /**
  * Query for changing the password of an user with a recover token
  * @param {User} Return the user
  **/
  change_password_user: async (_, args) => {
    await utils_password.check_password_strong_enough(args.password)
    await utils_recover_token.check_recover_token_exist_by_token(args.recover_token)
    const informations = utils_recover_token.get_informations_from_recover_token(args.recover_token)
    const user = await utils_user.get_user_by_id(informations.user_id)
    const hash = await utils_password.hash_password(args.password)
    await utils_user.edit_user_by_user(user, { password: hash })
    await utils_recover_token.invalid_token_by_user(user)
    return true
  }
}
