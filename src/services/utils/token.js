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
  },
  get_informations_from_recover_token: recover_token => {
    if (!recover_token) {
      throw new Error('The recover token cannot be null or undefined.')
    }

    const token = recover_token.split(process.env.ENCRYPTION_SPLIT)
    if (token.length !== 2) {
      throw new Error(`The recover token (${recover_token}) is invalid.`)
    }

    const hash = {
      iv: token[0],
      content: token[1]
    }

    return encryption.decrypt(hash)
  }
}
