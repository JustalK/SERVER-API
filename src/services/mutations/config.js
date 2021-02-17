'use strict'

const utils_config = require('@src/services/utils/config')
const libs_logger = require('@src/libs/logger')

/**
* Manage the queries for the authentification process
**/
module.exports = {
  /**
  * Edit the config
  * @param {Object} _ The return value of the resolver (not needeed here)
  * @param {Object} args The argument passed to the function
  **/
  edit_config: async (_, args) => {
    libs_logger.log('New edit of the config', { args })
    // Check if a config exist. Should be since it's mandatory
    const config = await utils_config.get_config()
    if (config === null) {
      throw new Error('The config does not exist.')
    }

    return utils_config.edit_config_by_config(config, args)
  }
}
