'use strict';

const validator = require("email-validator");

/**
* Manage the utils function for email
**/
module.exports = {
	/**
	* Check if an email is valide meaning in the format xxx@xxx.xxx
	* @params {string} email The email you want to check
	* @return True if the email is valid or else False 
	**/
	check_email: email => {
		return validator.validate(email);
	}
};
