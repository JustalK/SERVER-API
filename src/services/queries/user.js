'use strict'

const path = require('path')
const utils_user = require('@src/services/utils/user')
const utils_filter = require('@src/services/utils/filter')
const filename = path.basename(__filename, '.js')
const User = require('@src/models/' + filename)
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
    const sort = utils_filter.handle_sort_argument(args.sort, User)
    const order = utils_filter.handle_order_argument(args.order)
    return utils_user.get_all_users({ limit, sort, order })
  }
}
