'use strict'

/**
* Manage the utils function for the config
**/
module.exports = {
  /**
  * Handle the limit argument
  * @params {Int} limit The argument to handle
  * @return {Int|null} Return the limit or null
  **/
  handle_limit_argument: limit => {
    return limit !== null ? limit : null
  },
  /**
  * Handle the order argument
  * @params {String} order The argument to handle
  * @return {String} Return the order to use for the query
  **/
  handle_order_argument: order => {
    if (!order) {
      return 'DESC'
    }

    if (order !== 'DESC' && order !== 'ASC') {
      throw new Error(`The order (${order}) is not available for ordering. Only DESC and ASC are possible variable.`)
    }

    return order
  },
  /**
  * Handle the sorting argument
  * @params {String} sort The key on what we gonna apply the sort
  * @params {Object} model The model use for checking if a key is valid or no
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
  * @params {String} match The key on what we gonna apply the match
  * @return {String} The match key
  **/
  handle_match_argument: (match) => {
    if (!match) {
      return null
    }

    return match
  }
}
