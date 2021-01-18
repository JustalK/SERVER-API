'use strict';

const { gql } = require('apollo-server-fastify');

module.exports = gql`
  # The User with a token
  type Token implements Account {
    # The OAUTH token use for connecting
		token: String

    # The username of the user
		username: String!

    # The email of the user
		email: String!

    # The password of the user
		password: String!
	}
`
