'use strict';

const jwt = require('jsonwebtoken');

/**
* Manage the utils function for the auth
**/
module.exports = {
	/**
	* Create the informations to put inside the token
	* @params {Object} user The user you want to take the informations from
	* @return {Object} The payload
	**/
	create_payload: (user) => {
		return {
			date_given: Date.now(),
			username: user.username,
			email: user.email
		};
	},
	/**
	* Create a token for an user
	* @params {Object} user The user you want to create the token for
	* @return {string} The token for the OAUTH
	**/
	create_token: (user) => {
		const secret = Buffer.from(process.env.SECRET_JWT, 'base64');
		const payload = module.exports.create_payload(user);
		const token = jwt.sign(payload, secret);
		return token
	}
};
