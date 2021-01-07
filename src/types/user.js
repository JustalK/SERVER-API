'use strict';

const { gql } = require('apollo-server-fastify');

module.exports = gql`
	type User {
		username: String!
  	email: String!
  	password: String!
	}
`
