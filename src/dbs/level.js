'use strict';

const path = require('path');
const filename = path.basename(__filename, '.js');
const model = require('../models/' + filename);

module.exports = {
	/**
	* Call mongoDB for finding all the match to the request
	* @params {Object} find The matching parameters
	* @return {Level[]} Return an array of level
	**/
	get_all: (find) => {
		return model
			.find(find);
	}
};
