'use strict'

const encryption = require('@src/libs/encryption')

/**
* Manage the utils function for the config
**/
module.exports = {
  /**
  * Handle the limit argument
  * @params {Int} limit The argument to handle
  * @return {Int|null} Return the limit or null
  **/
  create_recover_token_from_user: user_id => {
    return encryption.encrypt(user_id)
  }
}
