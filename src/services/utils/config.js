/**
* The utils function for managing the configuration global of the app
* @module utils/config
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const Config = require('@src/models/' + filename)

/**
* Manage the utils function for the config
**/
module.exports = {
  get_config: async () => {
    return dbs.get_config()
  },
  edit_config_by_config: async (config, update) => {
    if (!module.exports.is_instanceof_config(config)) {
      throw new Error('This is not a config.')
    }

    return dbs.update_by_id(config._id, update)
  },
  /**
  * Test if the user is an instance of user
  * @param {Object} user The object user to test
  * @return {boolean} True if it's an object user or else false
  **/
  is_instanceof_config: config => {
    return config instanceof Config
  }
}
