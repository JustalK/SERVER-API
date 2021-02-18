/**
* The resolver for managing the config object type
* @module resolvers/config
*/
'use strict'

const utils_user_type = require('@src/services/utils/user_type')

module.exports = {
  /**
  * Process the default_user_type node
  * @param {Object} parent The object describing what field we try to extract from the node
  * @return {Object} The user_type with the information wanted
  **/
  default_user_type: (parent) => {
    return utils_user_type.get_user_type_by_id(parent.default_user_type)
  }
}
