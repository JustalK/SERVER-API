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

    login(login: String!, password: String!): Token

    edit_user_account(user_id: String!, user_type: String, username: String, email: String, password: String): User

    edit_config(password_minimum_character: Int, default_user_type_id: User_type): Config
  }
`
