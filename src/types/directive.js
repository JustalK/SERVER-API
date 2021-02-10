'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  directive @isLoggedIn on FIELD_DEFINITION
  directive @isAdmin on FIELD_DEFINITION
`
