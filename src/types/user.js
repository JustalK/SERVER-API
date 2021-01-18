'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  interface Account {
    username: String!
    email: String!
    password: String!
  }
  
  type User implements Account {
    username: String!
    email: String!
    password: String!
  }
`
