'use strict';

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
	}
};
