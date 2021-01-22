'use strict'

const utils_user_type = require('@src/services/utils/user_type')

/**
* Manage the utils function for the config
**/
module.exports = {
  default_user_type: (parent) => {
    return utils_user_type.get_user_type_by_id(parent.default_user_type)
  }
}
