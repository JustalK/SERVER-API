/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const marked = require('marked')

// Add an endpoint for testing the API
router.get('/', async (request, response) => {
  response.send({
    status: 'working'
  })
})

// Add a documentation endpoint coming from the README
router.get('/documentation', function (request, response) {
  const path = 'README.md'
  const file = fs.readFileSync(path, 'utf8')
  response.send(marked(file.toString()))
})

module.exports = router
