'use strict'

const apollo = require('./apollo');

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
	* Start the server using the parameter
	* @params {string} name The name of the server
	* @params {string} host The host of the server
	* @params {string} port The port of the server
	* @return {Promise<boolean>} True if the server start or else an error
	**/
	start: async (name, host, port) => {
		const server = module.exports.create_server();

		module.exports.register_graphql(server);

		return new Promise(async (resolve, reject) => {
			try {
				await server.listen(port);
				resolve(true);
			} catch (err) {
				server.log.error(err);
				process.exit(1);
			}
		});
	}
}
