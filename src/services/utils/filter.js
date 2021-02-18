/**
* The utils function for managing the parameter of the calls
* @module utils/filter
*/
'use strict'

const constants = require('@src/libs/constants')

/**
* Manage the utils function for the config
**/
module.exports = {
  /**
  * Handle the limit argument
  * @param {Int} limit The argument to handle
  * @return {Int|null} Return the limit or null
  **/
  handle_limit_argument: limit => {
    return limit !== null ? limit : null
  },
  /**
  * Handle the order argument
  * @param {String} order The argument to handle
  * @return {String} Return the order to use for the query
  **/
  handle_order_argument: order => {
    if (!order) {
      return constants.order_descending
    }

    if (order !== constants.order_descending && order !== constants.order_ascending) {
      throw new Error(`The order (${order}) is not available for ordering. Only 'desc' and 'asc' are possible variable.`)
    }

    return order
  },
  /**
  * Handle the sorting argument
  * @param {String} sort The key on what we gonna apply the sort
  * @param {Object} model The model use for checking if a key is valid or no
  * @return {String} The sort key
  **/
  handle_sort_argument: (sort, model) => {
    if (!sort) {
      return null
    }

    const keys_mongoose = ['__v', 'created_at', 'updated_at', 'id']
    const keys = Object.keys(model.schema.tree).filter(key => !keys_mongoose.includes(key))

    if (!keys.includes(sort)) {
      throw new Error(`The key (${sort}) is not available for sorting`)
    }

    return sort
  },
  /**
  * Handle the matching argument
  * @param {String} match The key on what we gonna apply the match
  * @return {String} The match key
  **/
  handle_match_argument: match => {
    if (!match) {
      return null
    }

    return match
  },
  /**
  * Handle the joint argument
  * @param {String} match The key on what we gonna apply the match joint
  * @return {String} The joint key
  **/
  handle_joint_argument: joint => {
    if (!joint) {
      return constants.joint_and
    }

    if (![constants.joint_and, constants.joint_or].includes(joint)) {
      throw new Error(`The key (${joint}) is not available for joint argument.`)
    }

    return joint
  }
}
