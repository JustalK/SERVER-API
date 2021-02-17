'use strict'

const validator = require('email-validator')
const mustache = require('mustache')
const fs = require('fs')
const mailgun = require('mailgun-js')({
  apiKey: process.env.API_MAILGUN_KEY,
  domain: process.env.API_MAILGUN_DOMAIN
})
const utils_token = require('@src/services/utils/token')

/**
* Manage the utils function for email
**/
module.exports = {
  /**
  * Check if an email is valide meaning in the format xxx@xxx.xxx
  * @param {string} email The email you want to check
  * @return {Boolean} True if the email is valid or else False
  **/
  check_email: email => {
    return validator.validate(email)
  },
  /**
  * Get the html template from the path given
  * @param {string} path The path of the mail template
  * @return {string} The template in a long string
  **/
  get_html_template_from_path: path => {
    if (!path) {
      throw new Error(`The path (${path}) cannot be null or undefined.`)
    }

    return fs.readFileSync(path, 'utf8')
  },
  /**
  * Prepare a forgetten password mail for an user
  * @param {string} to The email to who the mail will be send
  * @return {Object} Return the mailgun mail
  **/
  forgotten_password_email: user => {
    // Create the token
    const hash = utils_token.create_recover_token_from_user(user._id.toString())
    const token = hash.iv + process.env.ENCRYPTION_SPLIT + hash.content
    // Create the data to be parse by mustache
    const data = {
      username: user.username,
      recovery_url: process.env.FRONTEND_URL + process.env.ENDPOINT_EMAIL_FORGOTTEN + '?token=' + token
    }
    // Prepare the email
    return {
      mail: module.exports.prepare_email({
        subject: 'The password has been forgotten !',
        html: mustache.render(module.exports.get_html_template_from_path('./emails/email.html'), data),
        to: user.email
      }),
      token
    }
  },
  /**
  * Prepare a mail before being sent
  * @param {string} subject The subject of the mail
  * @param {string} to The email to who the mail will be send
  * @param {string} html The content of the mail
  * @return {Object} Return the mailgun mail
  **/
  prepare_email: ({ subject, to, html }) => {
    return {
      from: process.env.FROM_EMAIL,
      subject,
      to,
      html
    }
  },
  /**
  * Send a mailgun mail
  * @param {Object} mail The mail you want to send
  * @return {Boolean} True if the email is valid or else False
  **/
  send_email: async mail => {
    return new Promise((resolve, reject) => {
      mailgun.messages().send(mail, (error, body) => {
        if (error) {
          reject(error)
        }
        resolve(body)
      })
    })
  }
}
