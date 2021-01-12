'use strict';

const { ForbiddenError, SchemaDirectiveVisitor } = require('apollo-server-fastify');
const { defaultFieldResolver } = require('graphql');
const utils_auth = require('../utils/auth');

/**
* Create a directive for managing the Permissions of call
**/
class isLoggedinDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		field.resolve = async function (...args) {
			const context = args[2];
			const token = utils_auth.get_token_from_bearer(context.auth);
			if (!token) {
				throw new ForbiddenError("Not Authorized.");
			}

			const payload = utils_auth.decode_token(token);
			if (payload.date_given < payload.exp) {
				throw new ForbiddenError("The token expired.");
			}
			
			const result = await resolve.apply(this, args);
			return result;
		};
	}
}

module.exports = { isLoggedinDirective }
