'use strict'

const { gql } = require('apollo-server-express')

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
      "Order the result 'asc' or 'desc'"
      order: String,
      "Define the joint for multiple matching parameter 'and' or 'or'"
      joint: String,
      "Regex matching the username"
      username: String,
      "Regex matching the email"
      email: String): [User]! @isLoggedIn

    """
    Get recovery email from login\n
    Send an email inviting the user to change his password
    """
    send_recovery_email(
      "The login or the email of the user"
      login: String!): String!

    """
    Get User from recover token\n
    A recover token is a token gotten when the user asked for a new password
    """
    get_user_from_token(
      "The recovery token"
      recover_token: String!): User!

    """
    Return the config of the system
    """
    get_config: Config! @isAdmin @isLoggedIn
  }
`
