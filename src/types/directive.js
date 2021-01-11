'use strict';

const { gql } = require('apollo-server-fastify');

module.exports = gql`
	directive @isLoggedin on FIELD_DEFINITION
`
