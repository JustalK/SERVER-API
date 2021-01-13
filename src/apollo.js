'use strict'

const { ApolloServer, gql } = require('apollo-server-fastify');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');

module.exports = {
	/**
	* Get all the types definition from the types directory
	* @return {gql} Return the one gql schema
	**/
	get_types: () => {
		const types = fs.readdirSync('src/types');
		const typeDefs = types.map(type => {
			return require('./types/' + type.split('.')[0]);
		});
		return typeDefs;
	},
	/**
	* Get the all the methods from a path
	* @return {Object} Return The an object containing all the methods
	**/
	get_services: (path) => {
		let result = {};
		const services = fs.readdirSync(path);
		const path_without_src = path.replace('src/', './');
		services.map(service => {
			result = {...result, ...require(path_without_src + '/' + service.split('.')[0])};
		});
		return result;
	},
	/**
	* Get the queries from the services
	* @return {Object} Return The queries
	**/
	get_queries: () => {
		return module.exports.get_services('src/services/queries');
	},
	/**
	* Get the mutation from the services
	* @return {Object} Return The mutations
	**/
	get_mutations: () => {
		return module.exports.get_services('src/services/mutations');
	},
	/**
	* Get the directives from the services
	* @return {Object} Return The directives
	**/
	get_directives: () => {
		return module.exports.get_services('src/services/directives');
	},
	/**
	* Get the resolvers from the services directory
	* @return {Object} Return The resolver
	**/
	get_resolvers: () => {
		const queries = module.exports.get_queries();
		const mutations = module.exports.get_mutations();

		const resolvers = {
			Query: queries,
			Mutation: mutations
		};
		return resolvers;
	},
	/**
	* Create the excutable schema from the type deinition and resolver
	* @return {Object} Return the excutable schema for apollo
	**/
	create_schema: () => {
		const typeDefs = module.exports.get_types();
		const resolvers = module.exports.get_resolvers();
		const directives = module.exports.get_directives();

		const schema = makeExecutableSchema({
			typeDefs,
			resolvers,
			schemaDirectives: directives,
			resolverValidationOptions: {
				requireResolversForResolveType: false
			}
		});
		return schema;
	},
	/**
	* Create the apollo server
	* @params {Object} schema The excutable schema for apollo
	* @return {ApolloServer} The apollo server
	**/
	create_server: schema => {
		return new ApolloServer({
			schema,
			context: (req) => {
				// get the authorization from the request headers
				// return a context obj with our token. if any!
				const request = req.request;
				const auth = request.headers.authorization || '';
				return {
					auth
				};
			}
		});
	},
	/**
	* Create the handler to be use by fastify
	**/
	get_handler: () => {
		const schema = module.exports.create_schema();
		const server = module.exports.create_server(schema);

		return server.createHandler({
			path: '/api/graphql'
		})
	}
}
