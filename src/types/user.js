'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  type User {
    user_type: User_type!
    username: String!
    email: String!
    password: String!
  }
`
