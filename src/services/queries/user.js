'use strict'

const utils_user = require('@src/services/utils/user')
const utils_filter = require('@src/services/utils/filter')

/**
* Manage the queries for the question model
**/
module.exports = {
  /**
  * Query for getting all the user
  * @params {[User]} Return the list of all the user
  **/
  get_all_users: async (_, args) => {
    const limit = utils_filter.handle_limit_argument(args.limit)
    const order = utils_filter.handle_order_argument(args.order)
    return utils_user.get_all_users({ limit, order })
  }
}
