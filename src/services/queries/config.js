/**
* The queries for the config
* @module queries/config
*/
'use strict'

const utils_config = require('@src/services/utils/config')

/**
* Manage the utils function for the config
**/
module.exports = {
  /**
  * Return the config of the application
  * @return {Config} Return the config of the application
  **/
  get_config: () => {
    return utils_config.get_config()
  }
}
