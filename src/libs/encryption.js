/**
* Set of global functions or constants about encryptions
* @module libs/encryption
*/
'use strict'

const crypto = require('crypto')

const algorithm = process.env.ENCRYPTION_ALGORITHM
const secretKey = process.env.ENCRYPTION_SECRET_KEY
const iv = crypto.randomBytes(16)

module.exports = {
  /**
  * Encrypt a text with cypher
  * @param {string} text The text to encrypt
  * @return {Object} The hash of the encrypted text
  **/
  encrypt: text => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex')
    }
  },
  /**
  * Dencrypt a text with cypher
  * @param {Object} hash The hash to decrypt
  * @return {string} The decrypted text
  **/
  decrypt: hash => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])
    return decrpyted.toString()
  }
}
