'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
  * Call mongodb for adding an user to the database
  * @params {User} user The user to add to the database
  * @return {User} The user added with the id
  **/
  insert: (user) => {
    return model.create(user)
  },
  /**
  * Call mongodb for getting all the document
  * @params {Int} limit Limit the number of user returned
  * @return {[User]} All the users
  **/
  get_all_users: ({ limit = null, sort = null, order = null, username = null, email = null }) => {
    const aggregation = []

    // Manage all the matches
    const matches = []
    if (username !== null) {
      matches.push({ username: { $regex: username } })
    }
    if (email !== null) {
      matches.push({ email: { $regex: email } })
    }

    if (matches.length === 1) {
      aggregation.push({ $match: matches[0] })
    } else if (matches.length > 1) {
      aggregation.push({ $match: { $and: matches } })
    }

    // Sort the result
    order = order === 'DESC' ? 1 : -1
    sort = sort !== null ? { [sort]: order } : { _id: order }
    aggregation.push({ $sort: sort })

    // Limit the result
    if (limit !== null) {
      aggregation.push({ $limit: limit })
    }
    console.log(aggregation)
    return model.aggregate(aggregation)
  },
  /**
  * Call mongodb for getting an user by id
  * @params {String} id The id to search
  * @return {Object} The user found or null
  **/
  get_user_by_id: id => {
    return model.findOne({ _id: id })
  },
  /**
  * Call mongodb for getting an user by login
  * @params {String} login The login to search
  * @return {Object} The user found or null
  **/
  get_user_by_login: login => {
    return model.findOne({ $or: [{ email: login }, { username: login }] })
  },
  /**
  * Update a document in mongodb respecting the condtion
  * @params {Object} filter The condition the document has to respect
  * @params {Object} update The update to apply
  * @return {Object} The document updated or null
  **/
  update_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  },
  /**
  * Call mongodb for testing the existence of an user by username
  * @params {String} username The username to search
  * @return {boolean} True if a document exist or else False
  **/
  test_user_by_username: username => {
    return model.exists({ username: username })
  },
  /**
  * Call mongodb for testing the existence of an user by email
  * @params {String} username The username to search
  * @return {boolean} True if a document exist or else False
  **/
  test_user_by_email: email => {
    return model.exists({ email: email })
  }
}
