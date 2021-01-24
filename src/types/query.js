'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  # Root Query
  type Query  {
    """
    Return:
    true : DB save successful
    false : DB save unsuccessful
    """
    get_all_users: [User]! @isLoggedIn

    # Get the config of the API
    get_config: Config! @isAdmin @isLoggedIn
  }
`
