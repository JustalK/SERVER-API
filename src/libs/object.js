/**
* Set of global functions or constants about object
* @module libs/object
*/
'use strict'

const libs_string = require('@src/libs/string')

module.exports = {
  /**
  * Capitalize the first letter of a word or sentance
  * @param {string} sentance The word or sentance to capitalize
  * @return {string} The sentance or word captilized
  **/
  clean_values: (object, accept_null = true) => {
    let object_sanitized = Object.keys(object).map(key => {
      const sanitize_value = libs_string.sanitize(object[key])
      return [key, sanitize_value]
    })

    if (!accept_null) {
      object_sanitized = object_sanitized.filter(field => field[1] !== null)
    }

    return Object.fromEntries(object_sanitized)
  }
}
