'use strict'

module.exports = {
  /**
  * Return the mode of node or affect one if none has been given
  * @params {string} node_env The mode of node
  * @return {string} The mode of node
  **/
  mode: node_env => {
    return node_env !== undefined ? node_env : 'production'
  },
  /**
  * Capitalize the first letter of a word or sentance
  * @params {string} sentance The word or sentance to capitalize
  * @return {string} The sentance or word captilized
  **/
  capitalize: (sentance) => {
    if (typeof sentance !== 'string') return ''
    return sentance.charAt(0).toUpperCase() + sentance.slice(1)
  }
}
