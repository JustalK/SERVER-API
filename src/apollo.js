/**
* The module for managing everything relative to the apollo server
* @module apollo
*/
'use strict'

const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const libs_string = require('@src/libs/string')
const fs = require('fs')

module.exports = {
  /**
  * Get all the types definition from the types directory
  * @return {gql} Return the one gql schema
  **/
  get_types: () => {
    const types = fs.readdirSync('src/types')
    const typeDefs = types.map(type => {
      return require('./types/' + type.split('.')[0])
    })
    return typeDefs
  },
  /**
  * Get the all the methods from a path
  * @return {Object} Return The an object containing all the methods
  **/
  get_services: (path) => {
    let result = {}
    const services = fs.readdirSync(path)
    const path_without_src = path.replace('src/', './')
    services.map(service => {
      result = { ...result, ...require(path_without_src + '/' + service.split('.')[0]) }
      return null
    })
    return result
  },
  /**
  * Get the queries from the services
  * @return {Object} Return The queries
  **/
  get_queries: () => {
    return module.exports.get_services('src/services/queries')
  },
  /**
  * Get the mutation from the services
  * @return {Object} Return The mutations
  **/
  get_mutations: () => {
    return module.exports.get_services('src/services/mutations')
  },
  /**
  * Get the resolver for multiple level queries from the services
  * @return {Object} Return The resolvers
  **/
  get_resolvers_children: () => {
    const result = {}
    const resolvers = fs.readdirSync('src/services/resolvers')
    const path_without_src = './services/resolvers'
    resolvers.map(resolver => {
      const filename_without_ext = resolver.split('.')[0]
      const key = libs_string.capitalize(filename_without_ext)
      result[key] = require(path_without_src + '/' + filename_without_ext)
      return null
    })
    return result
  },
  /**
  * Get the directives from the services
  * @return {Object} Return The directives
  **/
  get_directives: () => {
    return module.exports.get_services('src/services/directives')
  },
  /**
  * Get the resolvers from the services directory
  * @return {Object} Return The resolver
  **/
  get_resolvers: () => {
    const queries = module.exports.get_queries()
    const mutations = module.exports.get_mutations()
    const resolvers_children = module.exports.get_resolvers_children()

    const resolvers = {
      Query: queries,
      Mutation: mutations,
      ...resolvers_children
    }
    return resolvers
  },
  /**
  * Create the excutable schema from the type deinition and resolver
  * @return {Object} Return the excutable schema for apollo
  **/
  create_schema: () => {
    const typeDefs = module.exports.get_types()
    const resolvers = module.exports.get_resolvers()
    const directives = module.exports.get_directives()

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      schemaDirectives: directives,
      resolverValidationOptions: {
        requireResolversForResolveType: false
      }
    })
    return schema
  },
  /**
  * Create the apollo server
  * @param {Object} schema The excutable schema for apollo
  * @return {ApolloServer} The apollo server
  **/
  create_server: schema => {
    return new ApolloServer({
      schema,
      introspection: true,
      playground: true,
      context: ({ req }) => {
        // get the authorization from the request headers
        // return a context obj with our token. if any!
        const auth = req.headers.authorization || ''
        return {
          auth
        }
      }
    })
  },
  /**
  * Create the handler to be use by fastify
  **/
  get_handler: () => {
    const schema = module.exports.create_schema()
    const server = module.exports.create_server(schema)

    return server
  }
}
