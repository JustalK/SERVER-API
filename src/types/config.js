'use strict'

const { gql } = require('apollo-server-express')

/**
 * The config object
 * @typedef {Object} Config
 * @property {boolean} password_minimum_character - password_minimum_character
 * @property {User_type} default_user_type - The user type an user signin will get
 */

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
    The minimum character a password can have
    """
    password_restriction: [String!]!
    """
    The user type an user signin will get
    """
    default_user_type: User_type!
  }
`
