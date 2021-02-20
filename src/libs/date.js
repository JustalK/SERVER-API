/**
* Set of global functions or constants about date
* @module libs/date
*/
'use strict'

module.exports = {
  /**
  * Get the date of yesterday
  **/
  yesterday: () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date
  }
}
