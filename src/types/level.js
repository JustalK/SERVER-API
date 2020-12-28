'use strict';

const { gql } = require('apollo-server-fastify');

module.exports = gql`
	type Level {
		name: String
		level: Int
	}
`
