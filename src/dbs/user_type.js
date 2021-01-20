'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
  * Call mongodb for getting a document respecting the condtion
  * @params {Object} The condition the document has to respect
  * @return {Object} The document found or null
  **/
  get_one: (find) => {
    return model.findOne(find)
  }
}
