'use strict'

const { gql } = require('apollo-server-express')

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
