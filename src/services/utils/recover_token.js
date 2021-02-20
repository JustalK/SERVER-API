/**
* The utils function for managing the token for recovering a password
* @module utils/token
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const encryption = require('@src/libs/encryption')

/**
* Manage the utils function for the config
**/
module.exports = {
  /**
  * Create a new valid token in the database for the user given
  * @param {String} user_id The _id of the user who request for a token
  * @param {String} token The encoded token to add
  * @return {Object} The recover_token saved
  **/
  add_recover_token: async (user_id, token) => {
    const recover_token = {
      user: user_id,
      token,
      date: Date.now()
    }

    return dbs.insert(recover_token)
  },
  /**
  * Handle the limit argument
  * @param {Int} limit The argument to handle
  * @return {Int|null} Return the limit or null
  **/
  create_recover_token_from_user: async user_id => {
    const recover_token = {
      user_id,
      date_given: Date.now()
    }
    const hash = encryption.encrypt(JSON.stringify(recover_token))
    const recover_token_encrypted = hash.iv + process.env.ENCRYPTION_SPLIT + hash.content
    await module.exports.add_recover_token(user_id, recover_token_encrypted)
    return recover_token_encrypted
  },
  /**
  * Get the information encoded in the recover token
  * @param {Object} recover_token The encoded token
  * @return {Object} The decoded information in the token
  **/
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
  },
  /**
  * Invalid a token by user
  * @param {user} user The user who need his token to be invalidated
  * @return {Object} The invalidated token
  **/
  invalid_token_by_user: async user => {
    return dbs.invalid_token_by_user(user._id)
  },
  /**
  * Check a recover token exist for an user an return an error if not
  * @param {String} user_id The _id of the user we want to check
  **/
  check_recover_token_exist_by_token: async token => {
    const exist = await dbs.test_recover_token_by_recover_token(token)
    if (!exist) {
      throw new Error('This recover token has already been used or does not exist.')
    }
  },
  /**
  * Delete the token outdated from the database
  **/
  invalid_outdated_token: async () => {
    return dbs.invalid_outdated_token()
  },
  /**
  * Get existing recover token by user id
  * @param {String} user_id The _id of the user we are looking for a token
  * @return {Object} The recover token
  **/
  get_existing_recover_token_by_user_id: async user_id => {
    return dbs.get_existing_recover_token_by_user_id(user_id)
  },
  /**
  * Test if a valid token exist in the database
  * @param {String} user_id The _id of the user we are looking for a token
  * @return {boolean} True if a token already exist or else false
  **/
  is_recover_token_exist_by_user_id: async user_id => {
    return dbs.test_recover_token_by_user(user_id)
  }
}
