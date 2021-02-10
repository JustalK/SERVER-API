'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  type Mutation  {
    """
    The method for signing to the application
    """
    signing(
      "The username of the user"
      username: String!,
      "The email of the user"
      email: String!,
      "The password of the user"
      password: String!
    ): Token

    """
    Login to the application with an account
    """
    login(
      "Username or email of the user"
      login: String!,
      "Password of the user"
      password: String!): Token

    """
    Edit an user account
    """
    edit_user_account(
      "Id of the user to modify"
      user_id: String!,
      "New name of the usertype to apply to the user"
      user_type: String,
      "New username of the user"
      username: String,
      "New email of the user"
      email: String,
      "New passport of the user"
      password: String): User

    """
    Edit the config of the server
    """
    edit_config(
      "New minimum length of the password for an user"
      password_minimum_character: Int,
      "New default usertype of an user"
      default_user_type_id: String): Config
  }
`
