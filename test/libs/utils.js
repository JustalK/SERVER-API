'use strict'

module.exports = {
  /**
  * Return the result of a graphql query
  * @params {Object} query The graphql query
  * @params {String} bearer The bearer token to add for authenticate query
  * @return {Object} The result of the query
  **/
  getter: async (query, bearer = null) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }

    if (bearer !== null) {
      options.headers.Authorization = 'Bearer ' + bearer
      options.credentials = 'include'
      options.withCredentials = true
      options.headers.Accept = 'application/json'
    }

    const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + process.env.ENDPOINT, options)
    const response_json = await response.json()
    return response_json.errors !== undefined ? response_json : response_json.data
  }
}
