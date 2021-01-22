'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)

/**
* Manage the queries for the question model
**/
module.exports = {
  /**
  * Services for getting all the question
  **/
  get_default_user_type: async (parent, args, context) => {
    console.log(parent)
    return { name: 'robert' }
  }
}
