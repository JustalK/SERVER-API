'use strict'

const { gql } = require('apollo-server-express')

/**
 * The User object
 * @typedef {Object} User
 * @property {boolean} _id - The id of the user
 * @property {User_type} user_type - The user type of the user
 * @property {string} username - The name of the user
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 */

module.exports = gql`
  """
  User of the app \n
  Control the account of the system
  """
  type User {
    """
    The id of the user
    """
    _id: String!
    """
    The user type of the user
    """
    user_type: User_type!
    """
    The name of the user
    """
    username: String!
    """
    The email of the user
    """
    email: String!
    """
    The password of the user
    """
    password: String!
  }
`
