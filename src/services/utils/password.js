'use strict';

const bcrypt = require('bcrypt');

/**
* Manage the queries for the level model
**/
module.exports = {
	/**
	* Hash a password with bcrypt
	* @params {number} alternative_salt If we want to specify a different salt that the environment file
	* @return The encrypted password
	**/
	hash_password: async (password, alternative_salt = null) => {
		const salt = alternative_salt !== null ? alternative_salt : Number(process.env.BCRYPT_SALT);
		return bcrypt.hash(password, salt);
	},
	/**
	* Check if the password has a lowercase
	* @params {string} password The password to check
	* @return {string} True if the password has a lowercase or else False
	**/
	has_lowercase: (password) => {
		return (/[a-z]/.test(password));
	},
	/**
	* Check if the password has a uppercase
	* @params {string} password The password to check
	* @return {string} True if the password has a uppercase or else False
	**/
	has_uppercase: (password) => {
		return (/[A-Z]/.test(password));
	},
	/**
	* Check if the password has a number
	* @params {string} password The password to check
	* @return {string} True if the password has a number or else False
	**/
	has_number: (password) => {
		return (/[0-9]/.test(password));
	},
	/**
	* Check if the password is long enough
	* @params {string} password The password to check
	* @return {string} True if the password is long enough or else False
	**/
	has_enough_length: (password, length) => {
		return password.length > Number(process.env.PASSWORD_LIMIT_CHARACTER);
	},
	/**
	* Check if the password depending of the conditon passed
	* The conditions represente the name of the function of the password util file
	* @params {string} password The password to check
	* @params {string[]} conditions An array of the name of the check function
	* @return {string} True if the password respect all condition or else False
	**/
	check_new_password: (password, conditions = []) => {
		const result = conditions.reduce((accumulator, current_value) => {
			return accumulator + Number(module.exports[current_value](password))
		}, 0);
		return result !== conditions.length;
	}
};
