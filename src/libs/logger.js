/**
* Set of global functions or constants about logs
* @module libs/logger
*/
'use strict'

const winston = require('winston')
const { combine, timestamp, prettyPrint } = winston.format

/**
* Config the logger for winston
**/
const logger_console = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
})

/**
* Config the logger for winston
**/
const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
})

module.exports = {
  /**
  * Write a message in the console and the logger
  * @param {string} The message who will be display
  * @param {boolean} Return true if log printed on console or else false
  **/
  info: (message, object, activate = process.env.LOGS_CONSOLE) => {
    if (activate === 'TRUE') {
      logger_console.info(message, object)
      return true
    }
    return false
  },
  /**
  * Write a message in the log file
  * @param {string} The message who will be writen
  * @param {string} The level of the log
  * @param {boolean} Return true if log logged or else false
  **/
  log: (message, object, level = 'info', activate = process.env.LOGS) => {
    if (activate === 'TRUE') {
      logger.log({ level, message, object })
      return true
    }
    return false
  }
}
