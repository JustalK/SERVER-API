'use strict'

module.exports = {
  /**
  * Capitalize the first letter of a word or sentance
  * @params {string} sentance The word or sentance to capitalize
  * @return {string} The sentance or word captilized
  **/
  capitalize: (sentance) => {
    if (typeof sentance !== 'string') return ''
    return sentance.charAt(0).toUpperCase() + sentance.slice(1)
  },
  /**
  * Sanitize a string for the database
  * @params {string} value The string to sanitize
  * @return {string} The sanitized string
  **/
  sanitize: (string) => {
    if (!string) {
      return null
    }

    return string.trim()
  }
}