'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')
const queries_user = require('@test/queries/user')
const queries_auth = require('@test/queries/auth')
const queries_config = require('@test/queries/config')
const queries_email = require('@test/queries/email')

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
  const response = await queries_user.create_new_random_user({})

  t.not(response.signing.user.username, undefined)
  t.not(response.signing.user.email, undefined)
  t.not(response.signing.token, undefined)
})

test('[ADMIN] Create new admin account', async t => {
  const response = await queries_user.create_new_random_admin({})
  t.not(response.create_admin_account.username, undefined)
  t.not(response.create_admin_account.email, undefined)
})

test('[USER] Trying to subscribe with an existing email', async t => {
  const response = await queries_user.create_new_random_user({
    email: 'admin@gmail.com'
  })

  t.is(response.errors[0].message, 'This email is already used by someone else.')
})

test('[USER] Trying to subscribe with wrong email', async t => {
  const response = await queries_user.create_new_random_user({
    email: 'test'
  })

  t.is(response.errors[0].message, 'This is not an email.')
})

test('[USER] Trying to subscribe with an existing username', async t => {
  const response = await queries_user.create_new_random_user({
    username: 'admin'
  })

  t.is(response.errors[0].message, 'This username is already used by someone else.')
})

test('[USER] Trying to subscribe with a weak password', async t => {
  const response = await queries_user.create_new_random_user({
    password: 'azerty'
  })

  t.not(response.errors[0].message, undefined)
})

test('[USER] Edit subscribe', async t => {
  const response_user = await queries_user.create_new_random_user({})
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

test('[USER] Trying to Forget password on inexisting user', async t => {
  const response = await queries_email.send_recovery_email('idontreallycare.iamnotworking@gmail.com')
  t.is(response.errors[0].message, 'This account does not exist.')
})

test('[USER] Forget password and change password', async t => {
  const response_creation_user = await queries_user.create_new_random_user({ email: 'justal.kevin@gmail.com' })
  const response_token = await queries_email.send_recovery_email('justal.kevin@gmail.com')
  const token = response_token.send_recovery_email
  t.not(token, undefined)

  const response_user = await queries_user.get_user_from_token(token)
  t.is(response_user.get_user_from_token._id, response_creation_user.signing.user._id)
  t.is(response_user.get_user_from_token.username, response_creation_user.signing.user.username)

  await queries_user.change_password_user('Qwerty10@10', token)
  const response_login = await queries_auth.login_user('justal.kevin@gmail.com', 'Qwerty10@10')
  t.is(response_login.login.user.username, response_creation_user.signing.user.username)
  t.is(response_login.login.user.email, 'justal.kevin@gmail.com')
})

test('[USER] Trying to forget password with an existing valid recover token already created', async t => {
  const response_token = await queries_email.send_recovery_email('justal.kevin.spam@gmail.com')
  const token = response_token.send_recovery_email
  t.not(token, 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
})

test('[USER] Trying to change password with an already used recover token', async t => {
  const response = await queries_user.change_password_user('Qwerty10@10', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
  t.is(response.errors[0].message, 'This recover token has already been used or does not exist.')
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
  const response_user = await queries_user.create_new_random_user({ password: 'Q@sDwerty10' })
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')
  const response = await queries_config.get_config(response_login.login.token)

  t.is(response.errors[0].message, 'You do not have enough permission for this request.')
})

test('[USER] Get all users with limit', async t => {
  const response_user = await queries_user.create_new_random_user({ password: 'Q@sDwerty10' })
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response_two_users = await queries_user.get_all_users({ limit: 2 }, response_login.login.token)
  t.is(response_two_users.get_all_users.length, 2)
  t.is(response_two_users.get_all_users[0].username, 'admin')
  t.is(response_two_users.get_all_users[0].email, 'admin@gmail.com')
  t.not(response_two_users.get_all_users[1].username, undefined)
  t.not(response_two_users.get_all_users[1].email, undefined)

  const response_one_users = await queries_user.get_all_users({ limit: 1 }, response_login.login.token)
  t.is(response_one_users.get_all_users.length, 1)
  t.is(response_two_users.get_all_users[0].username, 'admin')
  t.is(response_two_users.get_all_users[0].email, 'admin@gmail.com')
})

test('[USER] Get all users', async t => {
  const response_user = await queries_user.create_new_random_user({ password: 'Q@sDwerty10' })
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response = await queries_user.get_all_users({}, response_login.login.token)
  t.not(response.get_all_users.length, undefined)
  t.is(response.get_all_users[0].username, 'admin')
  t.is(response.get_all_users[0].email, 'admin@gmail.com')
  t.not(response.get_all_users[1].username, undefined)
  t.not(response.get_all_users[1].email, undefined)
})

test('[USER] Get all users sorted by name ordered', async t => {
  await queries_user.create_new_random_user({ username: '222' })
  await queries_user.create_new_random_user({ username: '111' })
  const response_user = await queries_user.create_new_random_user({ username: '000', password: 'Q@sDwerty10' })
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response = await queries_user.get_all_users({ sort: 'username', order: 'desc' }, response_login.login.token)
  t.not(response.get_all_users.length, undefined)
  const length = response.get_all_users.length
  t.is(response.get_all_users[0].username, '000')
  t.is(response.get_all_users[1].username, '111')
  t.is(response.get_all_users[2].username, '222')

  const response_ascending = await queries_user.get_all_users({ sort: 'username', order: 'asc' }, response_login.login.token)
  t.is(response_ascending.get_all_users[length - 1].username, '000')
  t.is(response_ascending.get_all_users[length - 2].username, '111')
  t.is(response_ascending.get_all_users[length - 3].username, '222')
})

test('[USER] Get all users with username', async t => {
  const response_user = await queries_user.create_new_random_user({ password: 'Q@sDwerty10' })
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response = await queries_user.get_all_users({ username: '.*dmin' }, response_login.login.token)
  t.is(response.get_all_users.length, 1)
  t.is(response.get_all_users[0].username, 'admin')
  t.is(response.get_all_users[0].email, 'admin@gmail.com')
})

test('[USER] Get all users with email', async t => {
  const response_user = await queries_user.create_new_random_user({ password: 'Q@sDwerty10' })
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response = await queries_user.get_all_users({ email: '.*dmin@' }, response_login.login.token)
  t.is(response.get_all_users.length, 1)
  t.is(response.get_all_users[0].username, 'admin')
  t.is(response.get_all_users[0].email, 'admin@gmail.com')
})

test('[USER] get_user_from_token for admin with expired token', async t => {
  const response = await queries_user.get_user_from_token('6012d27f399f18dbdc1e613af713697aw6b8294ef76026e3d613fec693286977ec4f973878e210b41336d8394bc3fe819f2881962514229e19ad4d204275ebc85f5997b2dd05a3d3ee6473e5891128de471')
  t.not(response.errors[0].message, null)
})

test('[XXX] get_user_from_token with bad value', async t => {
  const response = await queries_user.get_user_from_token('62395a24030edae2656c3b3e790ae6' + process.env.ENCRYPTION_SPLIT + '874de9d4de31b0443b963e315af8262429e930393f0573b9')
  t.not(response.errors[0].message, null)
})

test('[USER] Get all users with username and email', async t => {
  const response_user = await queries_user.create_new_random_user({ password: 'Q@sDwerty10' })
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response_empty = await queries_user.get_all_users({ username: 'adminx', email: '.*dmin@', joint: 'and' }, response_login.login.token)
  t.is(response_empty.get_all_users.length, 0)

  const response = await queries_user.get_all_users({ username: 'admin', email: '.*dmin@', joint: 'and' }, response_login.login.token)
  t.is(response.get_all_users.length, 1)
  t.is(response.get_all_users[0].username, 'admin')
  t.is(response.get_all_users[0].email, 'admin@gmail.com')
})

test('[USER] Get all users with username or email', async t => {
  const response_user = await queries_user.create_new_random_user({ password: 'Q@sDwerty10' })
  const response_login = await queries_auth.login_user(response_user.signing.user.username, 'Q@sDwerty10')

  const response_empty_on_one = await queries_user.get_all_users({ username: 'adminx', email: '.*dmin@', joint: 'or' }, response_login.login.token)
  t.is(response_empty_on_one.get_all_users.length, 1)

  const response = await queries_user.get_all_users({ username: 'admin', email: '.*dmin@', joint: 'or' }, response_login.login.token)
  t.is(response.get_all_users.length, 1)
  t.is(response.get_all_users[0].username, 'admin')
  t.is(response.get_all_users[0].email, 'admin@gmail.com')
})
