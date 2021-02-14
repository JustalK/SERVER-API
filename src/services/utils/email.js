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
  * @return True if the email is valid or else False
  **/
  check_email: email => {
    return validator.validate(email)
  },
  /**
  * Send a mail to a particular email
  * @params {string} email The email you want to send a mail
  * @return True if the email is valid or else False
  **/
  send_email: async user_email => {
    const mail = {
      from: process.env.FROM_EMAIL,
      subject: 'Test',
      to: user_email,
      html: 'aa'
    }
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
