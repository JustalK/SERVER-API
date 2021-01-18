'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  directive @isLoggedIn on FIELD_DEFINITION
`
