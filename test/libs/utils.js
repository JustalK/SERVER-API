'use strict'

module.exports = {
  /**
  * Return the result of a graphql query
  * @params {Object} query The graphql query
  * @return {Object} The result of the query
  **/
  getter: async query => {
    const response = await fetch('http://127.0.0.1:5000/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    })
    const response_json = await response.json()
    return response_json.data
  }
}
