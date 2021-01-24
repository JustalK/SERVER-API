'use strict'

module.exports = {
  /**
  * Return the result of a graphql query
  * @params {Object} query The graphql query
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
      options.headers.credentials = 'include'
      options.headers.withCredentials = true
    }
    console.log(options)
    const response = await fetch('http://127.0.0.1:5000/api/graphql', options)
    const response_json = await response.json()
    return response_json.data
  }
}
