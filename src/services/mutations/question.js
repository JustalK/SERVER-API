'use strict';

const path = require('path');
const filename = path.basename(__filename, '.js');
const dbs = require('../../dbs/' + filename);
const Question = require('../../models/' + filename);

/**
* Manage the mutations for the question model
**/
module.exports = {
	/**
	* Services for adding a new question to the actual question
	* @params {Object} parent The return value of the resolver (not needeed here)
	* @params {Object} args The argument passed to the function
	**/
	add_new_question: async (parent, args) => {
		const question = new Question(args);
		return dbs.insert(question);
	}
};
