'use strict'

const utils_user = require('@src/services/utils/user')
const utils_user_type = require('@src/services/utils/user_type')
const libs_logger = require('@src/libs/logger')

/**
* Manage the queries for the authentification process
**/
module.exports = {
  /**
  * Edit an user
  * @params {Object} _ The return value of the resolver (not needeed here)
  * @params {Object} args The argument passed to the function
  **/
  edit_user_account: async (_, args) => {
    libs_logger.log('New edit of an user account', { args })
    // Check if an account exist for the user
    const user = await utils_user.get_user_by_id(args.user_id)
    if (user === null) {
      throw new Error('This account does not exist.')
    }

    const user_type = await utils_user_type.get_user_type_by_id(user.user_type)
    if (user_type >= 99) {
      throw new Error('This account cannot be edited with this request.')
    }

    const update = args
    delete update.user_id

    return utils_user.edit_user_by_user(user, update)
  }
}
