'use strict';

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
  }
};
