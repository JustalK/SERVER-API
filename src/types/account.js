'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  interface Account {
    user_type: User_type!
    username: String!
    email: String!
    password: String!
  }

  type User_type {
    name: String!
    permission_level: String!
  }
`
