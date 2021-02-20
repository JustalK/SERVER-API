/**
* Module for managing the dbs for recover token
* @module dbs/recover_token
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)
const date = require('@src/libs/date')

module.exports = {
  /**
  * Call mongodb for adding a token to the database
  * @param {Object} recover_token The token to add to the database
  * @return {Object} The token added with the id
  **/
  insert: recover_token => {
    return model.create(recover_token)
  },
  /**
  * Call mongodb for getting a recover token by user_id
  * @param {String} user_id The _id of the user to search for a recover token
  * @return {Object} The recover token
  **/
  get_existing_recover_token_by_user_id: user_id => {
    return model.findOne({ user: user_id, used: false, deleted: false })
  },
  /**
  * Call mongodb for invalidating a token by user_id
  * @param {String} user_id The _id of the user to search
  * @return {Object} The token invalidated
  **/
  invalid_token_by_user: user_id => {
    return model.findOneAndUpdate({ user: user_id, used: false, deleted: false }, { used: true, deleted: true })
  },
  /**
  * Call mongodb for invalidating outdated token
  **/
  invalid_outdated_token: () => {
    return model.updateMany({ date: { $lt: date.yesterday() }, deleted: false }, { deleted: true })
  },
  /**
  * Call mongodb for testing if a token by the name of the user exists
  * @param {String} user_id The _id of the user to search
  * @return {boolean} True if a document exist or else False
  **/
  test_recover_token_by_user: user_id => {
    return model.exists({ user: user_id, used: false, deleted: false })
  },
  /**
  * Call mongodb for testing if a token by the token of the user exists
  * @param {String} token The token of the user to search
  * @return {boolean} True if a document exist or else False
  **/
  test_recover_token_by_recover_token: token => {
    return model.exists({ token, used: false, deleted: false })
  }
}
