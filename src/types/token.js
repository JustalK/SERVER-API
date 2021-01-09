'use strict';

const { gql } = require('apollo-server-fastify');

module.exports = gql`
	type Token implements Account {
		token: String
		username: String!
		email: String!
		password: String!
	}
`
