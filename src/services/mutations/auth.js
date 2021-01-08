'use strict';

const jwt = require('jsonwebtoken');
const secret = Buffer.from(process.env.SECRET_JWT, 'base64');
const utils_user = require('../utils/user');
const utils_auth = require('../utils/auth');

/**
* Manage the queries for the level model
**/
module.exports = {
	/**
	* Signing to the application
	**/
	signing: async (parent, args) => {
    const user = await utils_user.add_user(args);
    const payload = utils_auth.create_payload(user);
    const token = jwt.sign(payload, secret);
    return token;
	}
};
