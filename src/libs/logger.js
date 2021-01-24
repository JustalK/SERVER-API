'use strict'

const winston = require('winston')

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
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})

module.exports = {
  /**
  * Write a message in the console and the logger
  * @params {string} The message who will be display
  **/
  info: message => {
    logger_console.info(message)
  },
  /**
  * Write a message in the log file
  * @params {string} The message who will be writen
  * @params {string} The level of the log
  **/
  log: (message, level = 'info') => {
    if (process.env.LOGS === 'TRUE') {
      logger.log({ message, level })
    }
  }
}
