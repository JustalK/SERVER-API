'use strict'

const utils_config = require('@src/services/utils/config')

/**
* Manage the utils function for the config
**/
module.exports = {
  get_config: () => {
    return utils_config.get_config()
  }
}
