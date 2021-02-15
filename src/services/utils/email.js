'use strict'

const validator = require('email-validator')
const mailgun = require('mailgun-js')({
  apiKey: process.env.API_MAILGUN_KEY,
  domain: process.env.API_MAILGUN_DOMAIN
})

/**
* Manage the utils function for email
**/
module.exports = {
  /**
  * Check if an email is valide meaning in the format xxx@xxx.xxx
  * @params {string} email The email you want to check
  * @return {Boolean} True if the email is valid or else False
  **/
  check_email: email => {
    return validator.validate(email)
  },
  /**
  * Prepare a mail before being sent
  * @params {string} subject The subject of the mail
  * @params {string} to The email to who the email will be send
  * @params {string} html The content of the mail
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
  * @params {Object} mail The mail you want to send
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
