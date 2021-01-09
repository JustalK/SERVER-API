'use strict';

const path = require('path');
const utils_auth = require('./auth');
const utils_password = require('./password');
const filename = path.basename(__filename, '.js');
const dbs = require('../../dbs/' + filename);
const User = require('../../models/' + filename);

/**
* Manage the mutations for the question model
**/
module.exports = {
	/**
	* Services for adding a new user
	* @params {Object} args The argument passed to the function
	**/
	add_user: async (args) => {
	    const tmp_user = args;

		// Check if user already exist
		const is_email_already_used = await module.exports.is_user_exist_by_email(args.email);
		if (!is_email_already_used) {
			throw new Error('This email is already used by someone else.')
		}

		// Check if the password is strong
		const is_password_not_strong = utils_password.check_new_password(
			args.password,
			['has_lowercase', 'has_uppercase', 'has_number', 'has_enough_length']
		);
		if (is_password_not_strong) {
			throw new Error('This password is not strong enough. It must have a lowercase, an uppercase, a number and a length superior at ' + Number(process.env.PASSWORD_LIMIT_CHARACTER))
		}

		tmp_user.password = await utils_password.hash_password(tmp_user.password);
		const user = new User(args);
		return dbs.insert(user);
	},
	/**
	* Test the email if a user exist in the db with this email
	* @params {String} email Test if the user exist by email
	* @return True if the user exist or else False
	**/
	is_user_exist_by_email: async (email) => {
		return dbs.test({email: email});
	}
};