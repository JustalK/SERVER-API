'use strict'

require('dotenv').config({ path: './env/.env.production' })
require('isomorphic-fetch')
require('module-alias/register')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')
const queries_user = require('@test/queries/user')
const queries_auth = require('@test/queries/auth')
const queries_config = require('@test/queries/config')

test.before(async () => {
  await m.start()
  await m_seeding.seed()
})

test('[ADMIN] Login', async t => {
  const response = await queries_auth.login_admin()

  t.is(response.login.user.username, 'admin')
  t.is(response.login.user.email, 'admin@gmail.com')
  t.not(response.login.token, undefined)
})

test('[ADMIN] Login with not existing username', async t => {
  const response = await queries_auth.login_user('xxx', 'xxx')
  t.is(response.errors[0].message, 'This account does not exist.')
})

test('[ADMIN] Login with wrong password', async t => {
  const response = await queries_auth.login_user('admin', 'xxx')
  t.is(response.errors[0].message, 'The password is not correct.')
})

test('[USER] Subscribe', async t => {
  const response = await queries_user.create_new_random_user()

  t.not(response.signing.user.username, undefined)
  t.not(response.signing.user.email, undefined)
  t.not(response.signing.token, undefined)
})

test('[USER] Edit subscribe', async t => {
  const response_user = await queries_user.create_new_random_user()
  const username = response_user.signing.user.username
  const email = response_user.signing.user.email
  t.not(username, undefined)
  t.not(email, undefined)

  const response_user_edited = await queries_user.edit_user(response_user.signing.user._id)
  t.not(username, response_user_edited.edit_user_account.username)
  t.not(email, response_user_edited.edit_user_account.email)
})

test('[XXX] Trying to edit not existing user', async t => {
  const response = await queries_user.edit_user('aaaaaaaaaa56')
  t.is(response.errors[0].message, 'This account does not exist.')
})

test('[XXX] Trying to edit admin user', async t => {
  const response = await queries_user.edit_user('5fd5b58efbc2f7a33c2ab000')
  t.is(response.errors[0].message, 'This account cannot be edited with this request.')
})

test('[ADMIN] Get the config', async t => {
  const response_login = await queries_auth.login_admin()

  const response = await queries_config.get_config(response_login.login.token)

  t.not(response.get_config.password_minimum_character, undefined)
  t.not(response.get_config.default_user_type.name, undefined)
  t.not(response.get_config.default_user_type.permission_level, undefined)
})

test('[ADMIN] Edit config', async t => {
  const response_login = await queries_auth.login_admin()

  const response = await queries_config.edit_config(response_login.login.token)
  t.is(response.edit_config.password_minimum_character, 2)
})

test('[USER] Trying to access config with user profile', async t => {
  const response_user = await queries_user.create_new_random_user('Q@sDwerty10')
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')
  const response = await queries_config.get_config(response_login.login.token)

  t.is(response.errors[0].message, 'You do not have enough permission for this request.')
})

test('[USER] Get all users with limit', async t => {
  const response_user = await queries_user.create_new_random_user('Q@sDwerty10')
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response_two_users = await queries_user.get_all_users_with_limit(2, response_login.login.token)
  t.is(response_two_users.get_all_users.length, 2)
  t.is(response_two_users.get_all_users[0].username, 'admin')
  t.is(response_two_users.get_all_users[0].email, 'admin@gmail.com')
  t.not(response_two_users.get_all_users[1].username, undefined)
  t.not(response_two_users.get_all_users[1].email, undefined)

  const response_one_users = await queries_user.get_all_users_with_limit(1, response_login.login.token)
  t.is(response_one_users.get_all_users.length, 1)
  t.is(response_two_users.get_all_users[0].username, 'admin')
  t.is(response_two_users.get_all_users[0].email, 'admin@gmail.com')
})

test('[USER] Get all users', async t => {
  const response_user = await queries_user.create_new_random_user('Q@sDwerty10')
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response = await queries_user.get_all_users(response_login.login.token)
  t.not(response.get_all_users.length, undefined)
  t.is(response.get_all_users[0].username, 'admin')
  t.is(response.get_all_users[0].email, 'admin@gmail.com')
  t.not(response.get_all_users[1].username, undefined)
  t.not(response.get_all_users[1].email, undefined)
})

test('[USER] Get all users with username', async t => {
  const response_user = await queries_user.create_new_random_user('Q@sDwerty10')
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response = await queries_user.get_all_users_with_username('.*dmin', response_login.login.token)
  t.is(response.get_all_users.length, 1)
  t.is(response.get_all_users[0].username, 'admin')
  t.is(response.get_all_users[0].email, 'admin@gmail.com')
})
