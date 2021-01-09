'use strict';

const path = require('path');
const filename = path.basename(__filename, '.js');
const dbs = require('../../dbs/' + filename);

/**
* Manage the queries for the question model
**/
module.exports = {
	/**
	* Services for getting all the question
	**/
	get_all_users: async () => {
		return dbs.get_all({});
	}
};
