/**
* Set of global functions or constants about utils
* @module libs/utils
*/
'use strict'

module.exports = {
  /**
  * Return the mode of node or affect one if none has been given
  * @param {string} node_env The mode of node
  * @return {string} The mode of node
  **/
  mode: node_env => {
    return node_env !== undefined ? node_env : 'development'
  }
}
