'use strict';

const path = require('path');
const filename = path.basename(__filename, '.js');
const model = require('../models/' + filename);

module.exports = {
	/**
	* Call mongodb for adding an user to the database
	* @params {User} user The user to add to the database
	* @return {User} The user added with the id
	**/
	insert: (user) => {
		return model.create(user);
	},
	/**
	* Call mongodb for testing the existence of a document respecting the condtion
	* @params {Object} The condition the document has to respect
	* @return {boolean} True if a document exist or else False
	**/
	test: (find) => {
		return model.exists(find);
	}
};
