'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  # The User with a token
  """
  The user associated with a token
  """
  type Token {
    """
    The OAUTH token use for connecting
    """
    token: String

    """
    The user of the token
    """
    user: User!
  }
`
