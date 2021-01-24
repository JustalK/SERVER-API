'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  """
  Queries of the app
  """
  type Query  {
    """
    Return all the user in the system
    """
    get_all_users: [User]! @isLoggedIn

    """
    Return the config of the system
    """
    get_config: Config! @isAdmin @isLoggedIn
  }
`
