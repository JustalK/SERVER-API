'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('../../dbs/' + filename)

/**
* Manage the utils function for the config
**/
module.exports = {
  get_config: () => {
    return dbs.get_config()
  }
}
