'use strict';

const jwt = require('jsonwebtoken');

/**
* Manage the utils function for the auth
**/
module.exports = {
	create_payload: (user) => {
		return {
			date_given: Date.now(),
			username: user.username,
			email: user.email
		};
	},
	create_token: (user) => {
		const secret = Buffer.from(process.env.SECRET_JWT, 'base64');
		const payload = module.exports.create_payload(user);
		const token = jwt.sign(payload, secret);
		return token
	}
};
