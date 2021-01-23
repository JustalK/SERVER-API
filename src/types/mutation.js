'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  type Mutation  {
    signing(username: String!, email: String!, password: String!): Token
    login(login: String!, password: String!): Token

    edit_user_account(user_id: String!, user_type: String, username: String, email: String, password: String): User
  }
`
