'use strict'

const express = require('express')
const voyagerMiddleware = require('graphql-voyager/middleware')
const apollo = require('@src/apollo')
const logger = require('@src/libs/logger')

/**
* This module take care of the server creation
**/
module.exports = {
  /**
  * Create the restify server
  * @return {fastify} A server restify without any routes
  **/
  create_server: () => {
    return express()
  },
  /**
  * Allow us to use Graph QL with fastify
  * @params {fastify} server The server allowed to use graphQl
  **/
  register_graphql: (server) => {
    const apollo_server = apollo.get_handler()
    apollo_server.applyMiddleware({ app: server, path: process.env.ENDPOINT })
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

    module.exports.register_graphql(server)

    server.use(process.env.ENDPOINT_ERD, voyagerMiddleware.express({ endpointUrl: process.env.ENDPOINT }))
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
      reject('Server fail to start !')
    }
    logger.info('Server Started')
    resolve(true)
  }
}
