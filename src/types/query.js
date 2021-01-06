'use strict';

const { gql } = require('apollo-server-fastify');

module.exports = gql`
	type Query  {
		get_all_questions: [Question]!
		get_all_questions_by_level(level: Int): [Question]!
		get_random_questions(limit: Int): [Question]!
		get_all_levels: [Level]!
		count_total_questions: Int
		signing: String
	}
`
