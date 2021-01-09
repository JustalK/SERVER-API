'use strict';

const utils_user = require('../utils/user');
const utils_auth = require('../utils/auth');

/**
* Manage the queries for the level model
**/
module.exports = {
	/**
	* Signing to the application
	* @params {Object} parent The return value of the resolver (not needeed here)
	* @params {Object} args The argument passed to the function
	**/
	signing: async (parent, args) => {
		const user = await utils_user.add_user(args);
		const token = utils_auth.create_token(user);

		return {...user.toJSON(), token: token};
	},
	/**
	* Login to the application
	* @params {Object} parent The return value of the resolver (not needeed here)
	* @params {Object} args The argument passed to the function
	**/
	login: async (parent, args) => {
		const user = await utils_user.get_user_by_login(args.login);
		if (user === null) {
			throw new Error('This account does not exist.');
		}

		//TODO Check validity of the password
		const token = utils_auth.create_token(user);
		return {...user.toJSON(), token: token};
	}
};
