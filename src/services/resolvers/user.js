'use strict'

const utils_user_type = require('@src/services/utils/user_type')

/**
* Manage the resolver function for the user
**/
module.exports = {
  user_type: (parent) => {
    return utils_user_type.get_user_type_by_id(parent.user_type)
  }
}
