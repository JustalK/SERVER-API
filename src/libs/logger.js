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
  * @params {string} The message who will be display
  **/
  info: (message, object) => {
    logger_console.info(message, object)
  },
  /**
  * Write a message in the log file
  * @params {string} The message who will be writen
  * @params {string} The level of the log
  **/
  log: (message, object, level = 'info') => {
    if (process.env.LOGS === 'TRUE') {
      logger.log({ level, message, object })
    }
  }
}
