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
	}
};
