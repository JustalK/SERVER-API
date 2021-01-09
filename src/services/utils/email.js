'use strict';

const validator = require("email-validator");

/**
* Manage the utils function for email
**/
module.exports = {
	check_email: email => {
		return validator.validate(email);
	}
};
