'use strict'

const { gql } = require('apollo-server-fastify')

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
    login(login: String!, password: String!): Token

    """
    Edit an user account
    """
    edit_user_account(user_id: String!, user_type: String, username: String, email: String, password: String): User

    """
    Edit the config of the server
    """
    edit_config(password_minimum_character: Int, default_user_type_id: String): Config
  }
`
