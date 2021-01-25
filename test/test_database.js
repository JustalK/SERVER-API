'use strict'

require('module-alias/register')
const test = require('ava')
const m = require('@src/database')

test('[STATIC] Testing parse_db_uri with correct value', t => {
  const db_data = m.parse_db_uri('my_database', 'mongodb://localhost:27017/', 'robert', 'qwerty')

  t.is(db_data.db, 'my_database')
  t.is(db_data.host, 'localhost')
  t.is(db_data.port, '27017')
  t.is(db_data.username, 'robert')
  t.is(db_data.password, 'qwerty')
})

test('[STATIC] Testing create_mongo_uri with correct value', t => {
  const db_data_uri = m.create_mongo_uri({
    db: 'my_database',
    host: 'localhost',
    port: '27017',
    username: 'robert',
    password: 'qwerty'
  })

  t.is(db_data_uri, 'mongodb://robert:qwerty@localhost:27017/my_database')
})

test('[STATIC] Testing create_mongo_uri with different correct value', t => {
  const db_data_uri = m.create_mongo_uri({
    db: 'my_db',
    host: '192.168.1.26',
    port: '26920',
    username: 'nathalie',
    password: 'dsdf54654'
  })

  t.is(db_data_uri, 'mongodb://nathalie:dsdf54654@192.168.1.26:26920/my_db')
})
