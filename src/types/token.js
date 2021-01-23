'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  # The User with a token
  type Token {
    # The OAUTH token use for connecting
    token: String

    # The user of this token
    user: User!
  }
`
