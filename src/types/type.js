'use strict';

const { gql } = require('apollo-server-fastify');

module.exports = gql`
	type Type {
		name: String
	}
`
