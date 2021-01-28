'use strict'

const utils_user = require('@src/services/utils/user')

/**
* Manage the queries for the question model
**/
module.exports = {
  /**
  * Query for getting all the user
  * @params {[User]} Return the list of all the user
  **/
  get_all_users: async (_, args) => {
    const limit = args.limit !== null ? args.limit : null
    return utils_user.get_all_users(limit)
  }
}
