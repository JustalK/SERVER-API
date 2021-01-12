'use strict';

const { gql } = require('apollo-server-fastify');

module.exports = gql`
	type Query  {
		get_all_users: [User]! @isLoggedIn
	}
`
