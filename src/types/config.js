'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  type Config {
    password_limit_character: Int!
  }
`
