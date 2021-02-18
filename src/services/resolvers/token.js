/**
* The resolver for managing the token object type
* @module resolvers/token
*/
'use strict'

const utils_user = require('@src/services/utils/user')

module.exports = {
  /**
  * Process the user node
  * @param {Object} parent The object describing what field we try to extract from the node
  * @return {Object} The user with the information wanted
  **/
  user: parent => {
    return utils_user.get_user_by_id(parent.user)
  }
}
