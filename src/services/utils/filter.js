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
    if (!order || order !== 'DESC' || order !== 'ASC') {
      return 'DESC'
    }

    return order
  }
}
