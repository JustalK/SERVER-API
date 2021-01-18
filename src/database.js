'use strict'

const mongoose = require('mongoose')
const mongo_uri_builder = require('mongo-uri-builder')

module.exports = {
  /**
	* Parse the db_uri variable for extracting the db host, port, username and password
	* @params {string} db_name The name of the db
	* @params {string} db_uri The db uri
	* @params {string} db_username The username of the db
	* @params {string} db_password The password of the db
	* @return {Object} The data of the db
	**/
  parse_db_uri: (db_name, db_uri, db_username, db_password) => {
    db_uri += db_name
    const split_uri = db_uri.split('/')

    const db_data = {}
    db_data.db = split_uri[3]
    db_data.host = split_uri[2].split(':')[0]
    db_data.port = split_uri[2].split(':')[1]
    db_data.username = db_username
    db_data.password = db_password

    return db_data
  },
  /**
	* Create the mongo uri from the data of the db
	* @params {Object} The data of the db
	* @return {Object} The mongo uri object
	**/
  create_mongo_uri: db_data => {
    return mongo_uri_builder({
      username: db_data.username,
      password: db_data.password,
      host: db_data.host,
      port: db_data.port,
      database: db_data.db
    })
  },
  /**
	* Connect the app to the database
	* @params {string} db_name The name of the db
	* @params {string} db_uri The db uri
	* @params {string} db_username The username of the db
	* @params {string} db_password The password of the db
	**/
  mongoose_connect: (db_name, db_uri, db_username, db_password) => {
    const db_data = module.exports.parse_db_uri(db_name, db_uri, db_username, db_password)
    const db_uri_data = module.exports.create_mongo_uri(db_data)

    mongoose.connect(db_uri_data, { useNewUrlParser: true, useUnifiedTopology: true })
  }
}
