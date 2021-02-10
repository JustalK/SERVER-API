'use strict'

const { ForbiddenError, SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')
const utils_auth = require('@src/services/utils/auth')
const utils_user = require('@src/services/utils/user')
const utils_user_type = require('@src/services/utils/user_type')

const read_token_from_context = (context) => {
  const token = utils_auth.get_token_from_bearer(context.auth)
  if (!token) {
    throw new ForbiddenError('Not Authorized.')
  }
  const payload = utils_auth.decode_token(token)
  if (payload.date_given < payload.exp) {
    throw new ForbiddenError('The token expired.')
  }
  return payload
}

/**
* Create a directive for managing the Permissions of call
**/
class isLoggedIn extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      read_token_from_context(args[2])
      const result = await resolve.apply(this, args)
      return result
    }
  }
}

class isAdmin extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args) {
      const payload = read_token_from_context(args[2])
      const user = await utils_user.get_user_by_id(payload._id)
      const user_type = await utils_user_type.get_user_type_by_id(user.user_type)

      if (user_type.permission_level < 99) {
        throw new ForbiddenError('You do not have enough permission for this request.')
      }

      const result = await resolve.apply(this, args)
      return result
    }
  }
}

module.exports = { isLoggedIn, isAdmin }
