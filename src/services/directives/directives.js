const { ForbiddenError, SchemaDirectiveVisitor } = require('apollo-server-fastify');
const { defaultFieldResolver } = require('graphql');


/**
* Create a directive for managing the Permissions of call
**/
class isLoggedinDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const context = args[2];
      console.log(context);
      if (!context.auth) {
        throw new ForbiddenError("Not Authorized");
      }
      const result = await resolve.apply(this, args);
      console.log(result);
      return result;
    };
  }
}

module.exports = { isLoggedinDirective }
