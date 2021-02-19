'use strict'

const { gql } = require('apollo-server-express')

/**
 * The User_type object
 * @typedef {Object} User_type
 * @property {string} name - The name of the user type
 * @property {Number} permission_level - The permission of the user
 */

module.exports = gql`
  """
  User type of the app \n
  Control the permission of the system
  """
  type User_type {
    """
    The name of the user type
    """
    name: String!
    """
    The permission of the user \n
    The permission is a number ranging from [0 - 100] \n
    100 is the highest permission and represent a super admin\n
    0 is the lowest permission and represent a simple user
    """
    permission_level: Int!
  }
`
