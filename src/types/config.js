'use strict'

const { gql } = require('apollo-server-fastify')

module.exports = gql`
  """
  Manage the config of the app
  """
  type Config {
    """
    The minimum character a password can have
    """
    password_minimum_character: Int!
    """
    The user type an user signin will get
    """
    default_user_type: User_type!
  }
`
