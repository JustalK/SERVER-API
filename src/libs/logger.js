'use strict'

const winston = require('winston')

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})

module.exports = {
  info: message => {
    logger.info(message)
  },
  log: (message, level = 'info') => {
    logger.log({ message, level })
  }
}
