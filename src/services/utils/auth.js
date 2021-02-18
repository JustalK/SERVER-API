/**
* The utils function for managing the authentication process
* @module utils/auth
*/
'use strict'

const jwt = require('jsonwebtoken')

/**
* Manage the utils function for the auth
**/
module.exports = {
  /**
  * Return the secret key to be use with JWT
  * @return {string} The secret key
  **/
  get_secret: () => {
    return Buffer.from(process.env.SECRET_JWT, 'base64')
  },
  /**
  * Return the token from the bearer token
  * @param {string} bearer_token The bearer token
  * @return {string} The token
  **/
  get_token_from_bearer: bearer_token => {
    return bearer_token !== null && bearer_token.split(' ')[0] === 'Bearer' ? bearer_token.split(' ')[1] : null
  },
  /**
  * Create the informations to put inside the token
  * @param {Object} user The user you want to take the informations from
  * @return {Object} The payload
  **/
  create_payload: (user) => {
    return {
      date_given: Date.now(),
      _id: user._id
    }
  },
  /**
  * Create a token for an user
  * @param {Object} user The user you want to create the token for
  * @return {string} The token for the OAUTH
  **/
  create_token: (user) => {
    const payload = module.exports.create_payload(user)
    const token = jwt.sign(payload, module.exports.get_secret(), { expiresIn: process.env.TOKEN_EXPIRE_TIME })
    return token
  },
  /**
  * Decode a token using the secret key
  * @return {Object} The object who was encoded in the token
  **/
  decode_token: token => {
    return jwt.decode(token, module.exports.get_secret())
  }
}
