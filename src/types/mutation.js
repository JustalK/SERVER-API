'use strict';

const { gql } = require('apollo-server-fastify');

module.exports = gql`
	type Mutation  {
		add_new_question(question: String!): Question
		signing(username: String!, email: String!, password: String!): Token
	}
`
