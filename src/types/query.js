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
    get_all_users(
      "Limit the result"
      limit: Int,
      "Sort the result to a key"
      sort: String,
      "Order the result ASC or DESC"
      order: String,
      "Define the joint for multiple matching parameter 'and' or 'or'"
      joint: String,
      "Regex matching the username"
      username: String,
      "Regex matching the email"
      email: String): [User]! @isLoggedIn

    """
    Return the config of the system
    """
    get_config: Config! @isAdmin @isLoggedIn
  }
`
