'use strict'

const path = require('path')
const utils_user = require('@src/services/utils/user')
const utils_filter = require('@src/services/utils/filter')
const utils_token = require('@src/services/utils/token')
const utils_password = require('@src/services/utils/password')
const filename = path.basename(__filename, '.js')
const User = require('@src/models/' + filename)
/**
* Manage the queries for the question model
**/
module.exports = {
  /**
  * Query for getting all the user
  * @param {[User]} Return the list of all the user
  **/
  get_all_users: async (_, args) => {
    const limit = utils_filter.handle_limit_argument(args.limit)
    const sort = utils_filter.handle_sort_argument(args.sort, User)
    const order = utils_filter.handle_order_argument(args.order)
    const joint = utils_filter.handle_joint_argument(args.joint)
    const username = utils_filter.handle_match_argument(args.username)
    const email = utils_filter.handle_match_argument(args.email)
    return utils_user.get_all_users({ limit, sort, order, username, email, joint })
  },
  /**
  * Query for getting an user from a recover token
  * @param {User} Return the user
  **/
  get_user_from_token: async (_, args) => {
    const informations = utils_token.get_informations_from_recover_token(args.recover_token)
    return utils_user.get_user_by_id(informations.user_id)
  },
  /**
  * Query for changing the password of an user with a recover token
  * @param {User} Return the user
  **/
  change_password_user: async (_, args) => {
    const informations = utils_token.get_informations_from_recover_token(args.recover_token)
    const user = await utils_user.get_user_by_id(informations.user_id)
    const hash = await utils_password.hash_password(args.password)
    await utils_user.edit_user_by_user(user, { password: hash })
    return true
  }
}
