'use strict';

const jwt = require('jsonwebtoken');
const secret = Buffer.from('trololol', 'base64');

/**
* Manage the queries for the level model
**/
module.exports = {
	/**
	* Get all the levels
	**/
	signing: async () => {
    const payload = {
        date_given: Date.now()
    };

    const token = jwt.sign(payload, secret);
    return token;
	}
};
