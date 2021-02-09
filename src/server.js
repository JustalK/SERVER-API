'use strict'

const express = require('express')
const voyagerMiddleware = require('graphql-voyager/middleware')
const fs = require('fs')
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const apollo = require('@src/apollo')
const logger = require('@src/libs/logger')

/**
* This module take care of the server creation
**/
module.exports = {
  /**
  * Create the restify server
  * @return {Express} A server restify without any routes
  **/
  create_server: () => {
    return express()
  },
  /**
  * Allow us to use Graph QL with fastify
  * @params {Express} server The server allowed to use graphQl
  **/
  register_graphql: (server) => {
    const apollo_server = apollo.get_handler()
    apollo_server.applyMiddleware({ app: server, path: process.env.ENDPOINT })
  },
  /**
  * Allow us to use the middleware voyager
  * @params {Express} server The server allowed to use the middleware voyager
  **/
  register_voyager: (server) => {
    server.use(process.env.ENDPOINT_ERD, voyagerMiddleware.express({ endpointUrl: process.env.ENDPOINT }))
  },
  /**
  * Allow us to use the middleware Admin Bro
  * @params {Express} server The server allowed to use the middleware Admin Bro
  **/
  register_adminbro: (server) => {
    if (process.env.ADMINBRO === 'TRUE') {
      AdminBro.registerAdapter(AdminBroMongoose)

      const models = fs.readdirSync('src/models')
      const modelsList = models.map(model => {
        return require('./models/' + model.split('.')[0])
      })

      const router = AdminBroExpress.buildRouter(new AdminBro({
        databases: [],
        resources: modelsList,
        rootPath: process.env.ENDPOINT_ADMINBRO
      }))
      server.use(process.env.ENDPOINT_ADMINBRO, router)
    }
  },
  /**
  * Allow us to use the middleware express status monitor
  * @params {Express} server The server allowed to use the monitor
  **/
  register_monitor: (server) => {
    server.use(require('express-status-monitor')())
  },
  /**
  * Start the server using the parameter
  * @params {string} name The name of the server
  * @params {string} host The host of the server
  * @params {string} port The port of the server
  * @return {Promise<boolean>} True if the server start or else an error
  **/
  start: async (name, host, port) => {
    const server = module.exports.create_server()

    module.exports.register_adminbro(server)
    module.exports.register_graphql(server)
    module.exports.register_voyager(server)
    module.exports.register_monitor(server)

    server.use('/', require('./routes/app'))

    return new Promise((resolve, reject) => {
      server.listen({ port: port, host: host }, (error) => module.exports.callback(error, resolve, reject))
    })
  },
  /**
  * Handle the callback of the server listening
  * @params {Error} error The object error returned by the listen function
  **/
  callback: (error, resolve, reject) => {
    if (error) {
      logger.info('Server fail to start !')
      logger.log('Server fail to start !')
      reject('Server fail to start !')
    }
    logger.info('Server Started')
    logger.log('Logger Activated')
    resolve(true)
  }
}
