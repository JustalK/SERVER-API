'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  # Root Query
  type Query  {
    # Get all the user, can only be use if logged
    get_all_users: [User]! @isLoggedIn
    # Get the config of the API
    get_config: Config!
    # Get the config of the API
    get_default_user_type: User_type!
  }
`
