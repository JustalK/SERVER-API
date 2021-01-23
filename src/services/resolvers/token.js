'use strict'

const utils_user = require('@src/services/utils/user')

/**
* Manage the utils function for the config
**/
module.exports = {
  user: (parent) => {
    return utils_user.get_user_by_id(parent.user)
  }
}
