'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  type Config {
    password_limit_character: Int!
    default_user_type: User_type!
  }
`
