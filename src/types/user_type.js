'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  type User_type {
    name: String!
    permission_level: String!
  }
`
