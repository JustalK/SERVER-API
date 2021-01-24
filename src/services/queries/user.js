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
  get_all_users: async () => {
    return utils_user.get_all_users()
  }
}
