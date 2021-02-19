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
  /**
  * Return the config
  * @return {Config} The config of the app
  **/
  get_config: async () => {
    return dbs.get_config()
  },
  /**
  * Return the password restrctions from the config
  * @return {[String]} The name of the function for restrictinf the password
  **/
  get_password_restriction: async () => {
    const config = await dbs.get_config()
    return config.password_restriction
  },
  /**
  * Edit the config
  * @param {Config} config The config object to edit
  * @param {Object} update The update to make to the config
  * @return {Config} The updated config
  **/
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
