'use strict'

require('module-alias/register')
const utils = require('@src/libs/utils')
const mode = utils.mode(process.env.NODE_ENV)
require('dotenv').config({ path: './env/.env.' + mode })
const path = require('path')
const { Seeder } = require('mongo-seeding')

module.exports = {
  /**
  * Return the created seeder with the config given
  * @params {Object} config The config for the seeder
  * @return {Seeder} The seeder object
  **/
  get_seeder: (config) => {
    return new Seeder(config)
  },
  /**
  * Seed the database with the informations in data
  **/
  seed: async (folder = 'datas') => {
    const seeder = module.exports.get_seeder({
      database: process.env.DB_URI_DATA + process.env.DB_NAME,
      dropDatabase: true
    })

    const collectionReadingOptions = {
      transformers: [
        Seeder.Transformers.replaceDocumentIdWithUnderscoreId
      ]
    }

    const collections = seeder.readCollectionsFromPath(
      path.resolve('./seeding/' + folder),
      collectionReadingOptions
    )

    await seeder.import(collections)
  }
}
