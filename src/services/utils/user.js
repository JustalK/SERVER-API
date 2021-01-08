'use strict';

const bcrypt = require('bcrypt');
const path = require('path');
const filename = path.basename(__filename, '.js');
const dbs = require('../../dbs/' + filename);
const User = require('../../models/' + filename);

/**
* Manage the mutations for the question model
**/
module.exports = {
  hash_password: async (password, salt) => {
    return bcrypt.hash(password, salt);
  },
	/**
	* Services for adding a new user
	* @params {Object} args The argument passed to the function
	**/
	add_user: async (args) => {
    const tmp_user = args;
    tmp_user.password = await module.exports.hash_password(
      tmp_user.password,
      Number(process.env.BCRYPT_SALT)
    );
		const user = new User(args);
		return dbs.insert(user);
	}
};
