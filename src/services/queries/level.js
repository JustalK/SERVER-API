'use strict';

const path = require('path');
const filename = path.basename(__filename, '.js');
const dbs = require('../../dbs/' + filename);

/**
* Manage the queries for the level model
**/
module.exports = {
	/**
	* Get all the levels
	**/
	get_all_levels: async () => {
		return dbs.get_all({});
	}
};
