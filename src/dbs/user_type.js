/**
* Module for managing the dbs for user_type
* @module dbs/user_type
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
  * Call mongodb for getting an user by id
  * @param {String} id The id of the user type to search
  * @return {Object} The user type found or null
  **/
  get_user_type_by_id: id => {
    return model.findOne({ _id: id })
  },
  /**
  * Call mongodb for getting an user type by name
  * @param {String} name The name of the user type to search
  * @return {Object} The user type found or null
  **/
  get_user_type_by_name: name => {
    return model.findOne({ name: name })
  }
}
