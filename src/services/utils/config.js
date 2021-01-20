'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)

/**
* Manage the utils function for the config
**/
module.exports = {
  get_config: async () => {
    return dbs.get_config()
  }
}
