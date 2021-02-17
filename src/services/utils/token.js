'use strict'

const encryption = require('@src/libs/encryption')

/**
* Manage the utils function for the config
**/
module.exports = {
  /**
  * Handle the limit argument
  * @param {Int} limit The argument to handle
  * @return {Int|null} Return the limit or null
  **/
  create_recover_token_from_user: user_id => {
    const recover_token = {
      user_id,
      date_given: Date.now()
    }
    return encryption.encrypt(JSON.stringify(recover_token))
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

    const recover_token_string = JSON.parse(encryption.decrypt(hash))
    if (Date.now() - recover_token_string.date_given > Number(process.env.FORGET_TOKEN_EXPIRE_TIME.replace('h', '')) * 3600000) {
      throw new Error(`The token (${recover_token}) expired.`)
    }

    return recover_token_string
  }
}
