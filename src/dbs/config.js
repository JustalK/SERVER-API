/**
* Module for managing the dbs for config
* @module dbs/config
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
  * Call mongoDB for finding all the match to the request
  * @param {Object} find The matching parameters
  * @return {Level[]} Return an array of level
  **/
  get_config: () => {
    return model
      .findOne()
  },
  /**
  * Update a document in mongodb respecting the condtion
  * @param {Object} filter The condition the document has to respect
  * @param {Object} update The update to apply
  * @return {Object} The document updated or null
  **/
  update_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  }
}
