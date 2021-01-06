'use strict'

const apollo = require('./apollo');
const jwt = require('fastify-jwt');
/**
* This module take care of the server creation
**/
module.exports = {
	/**
	* Create the restify server
	* @return {fastify} A server restify without any routes
	**/
	create_server: () => {
		return require('fastify')({
			logger: true
		})
	},
	/**
	* Allow us to use Graph QL with fastify
	* @params {fastify} server The server allowed to use graphQl
	**/
	register_graphql: (server) => {
		server.register(apollo.get_handler());
	},
	/**
	* Allow us to use JWT with fastify for authentification system
	* @params {fastify} server The server allowed to use JWT
	**/
  register_jwt: (server) => {
    server.register(jwt, {
      secret: 'supersecret'
    })
  },
	/**
	* Start the server using the parameter
	* @params {string} name The name of the server
	* @params {string} host The host of the server
	* @params {string} port The port of the server
	* @return {Promise<boolean>} True if the server start or else an error
	**/
	start: async (name, host, port) => {
		const server = module.exports.create_server();

		module.exports.register_graphql(server);

		server.register(require('./routes/app'))

    return new Promise(async (resolve, reject) => {
			await server.listen({ port: port, host: host}, module.exports.errors);
			resolve(true);
		});
	},
	/**
	* Handle the callback of the server listening
	* @params {Error} error The object error returned by the listen function
	**/
	errors: (error) => {
		if (error) {
		 	throw new Error('Server fail');
		}
	}
}
