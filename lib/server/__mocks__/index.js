const { graphql } = require('graphql')
const defaults = require('../../config')
const schema = require('../schema')
const Data = require('../data')

module.exports = (userConfig = {}) => {
  const config = { ...defaults, ...userConfig }
  // const { silent } = config

  const rootValue = new Data(config)

  return options => {
    if (new Object(options) !== options) options = { query: options }
    const {
      query: requestString,
      variables: variableValues,
      operationName
    } = options

    return graphql(
      schema,
      requestString,
      rootValue,
      undefined,
      variableValues,
      operationName
    ).then(({ data, errors }) => {
      if (errors) throw errors
      else return data
    })
  }
}
