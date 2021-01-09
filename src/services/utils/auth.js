'use strict';

const bcrypt = require('bcrypt');

/**
* Manage the queries for the level model
**/
module.exports = {
	create_payload: (user) => {
		return {
			date_given: Date.now(),
			username: user.username,
			email: user.email
		};
	},
	hash_password: async (password, altenative_salt = null) => {
		const salt = altenative_salt !== null ? altenative_salt : Number(process.env.BCRYPT_SALT);
		return bcrypt.hash(password, salt);
	},
	has_lowercase: (password) => {
		return (/[a-z]/.test(password));
	},
	has_uppercase: (password) => {
		return (/[A-Z]/.test(password));
	},
	has_number: (password) => {
		return (/[0-9]/.test(password));
	},
	has_enough_length: (password, length) => {
		return password.length > Number(process.env.PASSWORD_LIMIT_CHARACTER);
	},
	check_new_password: (password, conditions = []) => {
		const result = conditions.reduce((accumulator, current_value) => {
			return accumulator + Number(module.exports[current_value](password))
		}, 0);
		return result !== conditions.length;
	}
};
